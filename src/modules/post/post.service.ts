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

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
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

    const total = await tx.post.count();

    return { data: result, total };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },

    data: payload,
  });
  return result;
};

export const PostService = {
  insertPost,
  getAllPost,
  getSinglePost,
  updatePost,
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
