import { defineEventHandler } from "#imports";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  try {
    const getItem = await event.context.prisma.comment.delete({
      where: {
        id: event?.context?.params?.id,
      },
    });

    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "comment",
      method: "delete",
      objectResult: getItem,
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
