import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // const getAllUser = await prisma.user.findMany();
    // console.log(getAllUser);

  const postUser = await prisma.user.create({
    data: {
      name: "Raj",
      email: "raj@gmail.com",
      age: 23
    },
  });
}

main()
