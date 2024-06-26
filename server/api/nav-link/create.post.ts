import { getServerSession } from "#auth";

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
    const item = await event.context.prisma.navigation.create({
      data: body,
    });
    return {
      statusCode: 200,
      statusMessage: "Success",
      table: "nav-link",
      method: "create",
      objectResult: item,
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
