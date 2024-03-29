import type { H3Error } from "h3";

interface IProps {
  postId: string;
  body: string;
  userId: string;
  anonumousName: string;
}
export default defineEventHandler(async (event) => {
  try {
    const { anonumousName, body, postId, userId } = await readBody<IProps>(event);
    if (postId) {
      if (userId) {
        console.log("User==========");
        const createResult = await event.context.prisma.comment.create({
          data: {
            body,
            anonumousName,
            Posts: {
              connect: {
                id: postId,
              },
            },
            Author: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "comment",
          method: "create",
          objectResult: createResult,
        };
      }
      console.log("Anonumous==========");

      const createResult = await event.context.prisma.comment.create({
        data: {
          body,
          anonumousName,
          Posts: {
            connect: {
              id: postId,
            },
          },
        },
        select: {
          id: true,
          date: true,
          body: true,
          postId: true,
          Author: true,
          anonumousName: true,
        },
      });
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "comment",
        method: "create",
        objectResult: createResult,
      };
    }
    return {
      statusCode: 400,
      statusMessage: "Wrong Post ID",
      table: "comment",
    };
  } catch (error) {
    console.log(error);

    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
