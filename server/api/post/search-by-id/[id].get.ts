import { createError, defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const post = await event.context.prisma.post.findFirst({
      where: {
        id: event?.context?.params?.id,
      },
    });

    if (!post) {
      throw createError({
        statusCode: 405,
        statusMessage: "Wrong Id ",
      });
    }

    return post;
  } catch (error) {
    console.log(error);
    return error;
  }
});
