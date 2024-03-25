import { defineEventHandler } from "#imports";
import type { H3Error } from "h3";
import { remove_file_from_store } from "~/server/utils/remove_file_helper";

export default defineEventHandler(async (event) => {
  try {
    const getItem = await event.context.prisma.file.delete({
      where: {
        id: event?.context?.params?.id,
      },
    });

    getItem?.id &&
      getItem.file_type === "Audio" &&
      getItem.adition_binary &&
      remove_file_from_store(getItem.adition_binary);

    return {
      statusCode: 200,
      statusMessage: "Success",
      table: getItem.file_type === "Image" ? "file" : "podcasts",
      method: "delete",
      objectResult: getItem,
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
