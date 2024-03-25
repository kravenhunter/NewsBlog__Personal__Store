import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const body = await readBody(event);
    const createResult = await event.context.prisma.comment.create({
      data: body,
      select: {
        id: true,
        Author: true,
        anonumousName: true,
        postId: true,
        body: true,
      },
    });
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "comment",
      method: "create",
      objectResult: createResult,
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
