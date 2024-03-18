import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const getPostList = await event.context.prisma.file.findMany({
      orderBy: { create_at: "desc" },
    });

    if (!getPostList.length) {
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }

    return getPostList;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
