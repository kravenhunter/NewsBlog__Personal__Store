import { defineEventHandler } from "#imports";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const posts = await event.context.prisma.post.findMany({
      take: 5, // Max rows
      where: {
        title: {
          contains: event?.context?.params?.id,
        },
      },
    });

    if (!posts) {
      // throw new Error("");
      throw createError({
        statusCode: 404,
        statusMessage: "No records in database ",
      });
    }

    return posts;
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
