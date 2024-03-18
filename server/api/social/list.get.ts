// import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  try {
    const getItemList = await event.context.prisma.social.findMany();

    if (!getItemList.length) {
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }
    return getItemList;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
