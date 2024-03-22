import { defineEventHandler } from "#imports";
import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  console.log("Delete");
  if (event?.context?.params?.id) {
    try {
      const getItem = await event.context.prisma.advertise.delete({
        where: {
          id: event?.context?.params?.id,
        },
      });
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "advertise",
        method: "delete",
        objectResult: getItem,
      };
    } catch (error) {
      console.log(error);
      const getError = error as H3Error;
      throw createError({
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      });
    }
  }
  // try {

  //   // const findItem = await event.context.prisma.advertise.findFirst({
  //   //   where: {
  //   //     id: event?.context?.params?.id,
  //   //   },
  //   // });

  //   // const getItem = await event.context.prisma.advertise.delete({
  //   //   where: {
  //   //     id: event?.context?.params?.id,
  //   //   },
  //   // });

  //   return {
  //     statusCode: 200,
  //     statusMessage: "Success",
  //     table: "advertise",
  //     // method: "create",
  //     // objectResult: getItem,
  //   };
  // } catch (error) {
  //   console.log(error);
  //   const getError = error as H3Error;
  //   throw createError({
  //     statusCode: getError.statusCode,
  //     statusMessage: getError.message,
  //   });
  // }
});
