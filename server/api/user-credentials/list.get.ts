import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const getItemList = await event.context.prisma.user_Credentials.findMany({
      orderBy: { date: "desc" },
    });

    if (!getItemList.length) {
      return {
        statusCode: 404,
        statusMessage: "No records in database ",
      };
    }

    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "user-credential",
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
