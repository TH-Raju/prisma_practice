import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const insertUser = async (data: User): Promise<User> => {
  const result = await prisma.user.create({ data });
  return result;
};

const getAllUser = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = {
  insertUser,
  getAllUser,
};
