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
  const { sortBy, sortOrder, searchTerm, page, limit } = option;

  // describe on bottom \/
  let limitData = parseInt(limit);
  let pageData = parseInt(page);
  const skip = limitData * pageData - limitData;
  const take = limitData;

  const result = await prisma.post.findMany({
    skip,
    take,
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
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          author: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
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

/**
 * limit = 5
 * page = 2
 * total = 10
 *
 * take = limit
 * skip = limit * page - limit
 *      = 5 * 2 - 5
 *
 *
 * 1 2 3 4 -show => 5 6 7 8 9 10 11 12 13 14 15
 *
 *
 */
