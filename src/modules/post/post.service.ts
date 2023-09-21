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

const getAllPost = async (option: any) => {
  const { sortBy, sortOrder, searchTerm } = option;
  const result = await prisma.post.findMany({
    include: {
      author: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    where: {
      title: {
        contains: searchTerm,
      },
    },
  });
  return result;
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

export const PostService = {
  insertPost,
  getAllPost,
  getSinglePost,
};
