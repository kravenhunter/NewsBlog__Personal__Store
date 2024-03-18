export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const user = await event.context.prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  return user;
});
