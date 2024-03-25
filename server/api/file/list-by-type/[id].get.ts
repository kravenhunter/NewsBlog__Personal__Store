import type { H3Error } from "h3";

export default defineEventHandler(async (event) => {
  //console.log("type =========", event?.context?.params?.id);

  try {
    if (event?.context?.params?.id === "audio" || event?.context?.params?.id === "images") {
      const getItemList = await event.context.prisma.file.findMany({
        orderBy: { create_at: "desc" },
        where: {
          file_type: event.context.params.id === "audio" ? "Audio" : "Image",
          advertise_Id: {
            equals: null,
          },
          imageBg_Id: {
            equals: null,
          },
          imagePrev_Id: {
            equals: null,
          },
        },
        select: {
          id: true,
          file_type: true,
          file_binary: true,
          adition_binary: true,
          create_at: true,
          title: true,
          description: true,
          User_Credentials: true,
          tag: true,
        },
      });

      if (!getItemList.length) {
        return {
          statusCode: 404,
          statusMessage: "No records in database ",
          table: event.context.params.id === "audio" ? "podcasts" : "file",
        };
      }

      return {
        statusCode: 200,
        statusMessage: "Success",
        table: event.context.params.id === "audio" ? "podcasts" : "file",
        objectResult: getItemList,
      };
    } else {
      return {
        statusCode: 404,
        statusMessage: "Wrong request type",
      };
    }
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
