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

    await event.context.prisma.social.update({
      where: { id: event?.context?.params?.id },
      data: body,
    });
    return "Success";
  } catch (error) {
    console.log(error);
    return error;
  }
});
