import { prisma } from "../lib/prisma";

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Gity',
      email: 'gity@example.com',
      password: '123456',
    },
  });
  console.log(user);
}

main();