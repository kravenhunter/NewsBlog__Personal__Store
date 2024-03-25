import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  console.log("Post API ROUTE ===============");

  try {
    const getItemList = await event.context.prisma.post.findMany();

    console.log("Posy List ===============", getItemList[0].title);
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
