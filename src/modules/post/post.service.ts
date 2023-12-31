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
  const skip = limitData * pageData - limitData || 0;
  const take = limitData || 30;

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
): Promise<Post | number> => {
  // const result = await prisma.post.update({
  //   where: {
  //     id,
  //   },

  //   data: payload,
  // });

  // Raw Database

  const result =
    await prisma.$executeRaw`update posts set title = ${payload.title} where id=${id}`;
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

const learnAggrigateAndGrouping = async () => {
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authorId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authorId: true,
  //   },
  // });

  const result = await prisma.post.groupBy({
    //we can use multiple value in there with 'title'
    by: ["title"],

    // we can use aggreate also
    _count: {
      authorId: true,
    },
  });
  return result;
};

export const PostService = {
  insertPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  learnAggrigateAndGrouping,
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
