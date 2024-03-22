import { createError, defineEventHandler } from "#imports";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const post = await event.context.prisma.post.findFirst({
      where: {
        id: event?.context?.params?.id,
      },
    });

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: "No records in database ",
      });
    }

    return post;
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
