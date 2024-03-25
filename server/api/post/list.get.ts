import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const getItemList = await event.context.prisma.post.findMany({
      orderBy: { date: "desc" },
      // include: {
      //   imageBg: true,
      //   imagePrev: true,
      //   tags: true,
      //   Comment: true,
      // },
      // select: {
      //   imageBg: true,
      //   imagePrev: true,
      //   tags: true,
      //   Comment: true,
      // },
    });
    console.log(getItemList);

    if (!getItemList.length) {
      console.log("Empty array Posts ===============");
      return {
        statusCode: 404,
        statusMessage: "No records in database ",
      };
    }
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "post",
      objectResult: getItemList,
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
