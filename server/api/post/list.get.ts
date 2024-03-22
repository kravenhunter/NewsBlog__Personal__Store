// import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const getPostList = await event.context.prisma.post.findMany({
      orderBy: { date: "desc" },
      include: {
        imageBg: true,
        imagePrev: true,
        tags: true,
        Comment: true,
      },
    });

    if (!getPostList.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "No records in database ",
      });
    }
    return getPostList;
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
