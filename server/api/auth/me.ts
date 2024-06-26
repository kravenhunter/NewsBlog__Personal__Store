import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

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
  const userCredentials = await event.context.prisma.user_Credentials.findFirst({
    where: {
      User: {
        email: body.email,
      },
    },
  });
  return userCredentials;
});
