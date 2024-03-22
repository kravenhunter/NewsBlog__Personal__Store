// import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    // const session = await getServerSession(event);
    // if (!session) {
    //   throw createError({
    //     statusCode: 401,
    //     statusMessage: "Unauthorized",
    //   });
    // }

    const getPostList = await event.context.prisma.file.findMany({
      orderBy: { create_at: "desc" },
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
