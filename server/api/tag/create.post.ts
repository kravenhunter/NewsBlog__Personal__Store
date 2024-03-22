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

    const { title } = await readBody<{ title: string }>(event);
    // console.log("Body cate", body);
    if (title) {
      const item = await event.context.prisma.tag.create({
        data: { title },
      });
      console.log("Category created", item);
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "tag",
        method: "create",
        objectResult: item,
      };
    }
    return {
      statusCode: 200,
      statusMessage: "Title is empty",
      table: "tag",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
