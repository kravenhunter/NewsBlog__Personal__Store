import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const result = await event.context.prisma.post.delete({
      where: {
        id: event?.context?.params?.id,
      },
    });

    return "Success";
  } catch (error) {
    console.log(error);
    return error;
  }
});
