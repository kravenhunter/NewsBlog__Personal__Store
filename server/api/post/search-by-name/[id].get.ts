import { defineEventHandler } from "#imports";

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
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }

    return posts;
  } catch (error) {
    console.log(error);
    return error;
  }
});
