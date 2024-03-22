// import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const getItemList = await event.context.prisma.advertise.findMany({
      orderBy: { date: "desc" },
      include: {
        source: true,
      },
    });

    if (!getItemList.length) {
      throw createError({
        statusCode: 405,
        statusMessage: "No records in database ",
      });
    }
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "advertise",
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
