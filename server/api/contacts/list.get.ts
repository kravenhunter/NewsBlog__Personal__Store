// import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const getPostList = await event.context.prisma.contacts.findMany({
      include: {
        Socials: true,
      },
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
