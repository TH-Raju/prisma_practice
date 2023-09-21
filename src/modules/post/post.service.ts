import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertPost = async (data: Post): Promise<Post> => {
  const result = prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllPost = async () => {
  const result = await prisma.post.findMany({
    include: {
        author: true,
        category: true
    }
  });
  return result;
};

export const PostService = {
  insertPost,
  getAllPost,
};
