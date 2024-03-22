import { defineEventHandler } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    if (event?.context?.params?.id) {
      const result = await event.context.prisma.navigation.delete({
        where: {
          id: event?.context?.params?.id,
        },
      });
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "nav-link",
        method: "delete",
        objectResult: result,
      };
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: "The ID file is empty in request",
      });
    }
  } catch (error) {
    console.log(error);
    return error;
  }
});
