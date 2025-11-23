"use server";

import { prisma } from "../lib/prisma";

export async function createMessageAction(text: string) {
  const message = prisma.message.create({ data: { text } });
  return message;
}
