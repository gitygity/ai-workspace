import bcrypt from "bcryptjs";
import { prisma } from "lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role } = await req.json();
    if (!email || !password || !name || !role)
     {
        console.log(email, password, name, role)
         return NextResponse.json({ error: "Invalid data" }, { status: 400 });}

    const isExist = await prisma.user.findUnique({ where: { email } });
    if (isExist)
      return NextResponse.json(
        { error: "user elready exists!" },
        { status: 400 }
      );

    const hashedPass = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { email, password: hashedPass, role, name },
    });
    return NextResponse.json({ ok: true, user: newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Server Error"+" : "+error }, { status: 500 });
  }
}
