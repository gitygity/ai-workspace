import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export async function GET() {
    try {
       const messages=await prisma.message.findMany({orderBy: {createdAt:'desc'}})

       return NextResponse.json(messages,{status:200})
        
    } catch (error) {
        console.log("🚀 ~ GET ~ error:", error)

        return NextResponse.json({error:"Failed to fetch messages"},{status:500})
    }
    
}


export async function POST(req:Request) {
    try {
        const {text}=await req.json()

        if(!text) return NextResponse.json({error:"Text is required"},{status:400})

        const message=await prisma.message.create({
          data:{text}
        })

        return NextResponse.json(message,{status:200})

    } catch (error) {
         console.log("🚀 ~ GET ~ error:", error)

        return NextResponse.json({error:"Failed to save message"},{status:500})
    }
}