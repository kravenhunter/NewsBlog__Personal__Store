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

    const body = await readBody(event);
    const getItem = await event.context.prisma.about.create({
      data: body,
    });
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "about",
      method: "create",
      objectResult: getItem,
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.message,
    });
  }
});
