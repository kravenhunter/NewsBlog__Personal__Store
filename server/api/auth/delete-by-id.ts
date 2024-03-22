import { getServerSession } from "#auth";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    return { status: "Unauthorized" };
  }
  // const account = await event.context.prisma.account.findFirst({
  //   where: {
  //     user: {
  //       email: body.email,
  //     },
  //   },
  // });
  try {
    const userCredentials = await event.context.prisma.user_Credentials.findFirst({
      where: {
        id: event.context.params?.id,
      },
    });

    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  } catch (error) {
    const errorResult = error as H3Error;
    throw createError({
      statusCode: errorResult.statusCode,
      message: errorResult.message,
      statusMessage: errorResult.statusMessage,
    });
  }
});
