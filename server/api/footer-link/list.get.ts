// import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const getItemList = await event.context.prisma.footerLink.findMany();

    if (!getItemList.length) {
      return {
        statusCode: 404,
        statusMessage: "No records in database ",
      };
    }
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "footer-link",
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
