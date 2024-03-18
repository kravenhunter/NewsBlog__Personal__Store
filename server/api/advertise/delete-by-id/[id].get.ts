import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    await event.context.prisma.advertise.delete({
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
