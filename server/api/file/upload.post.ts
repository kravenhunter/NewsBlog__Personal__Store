import { getServerSession } from "#auth";
import type { H3Error } from "h3";
import { convertFileTOBase64 } from "~/server/utils";

export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    const body = await readMultipartFormData(event);

    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    if (body?.length) {
      // MultiPartData содержит буфер изображения
      // преоббразуем в Buffer и потом в строку формата base64

      const getFILEData = body[0];

      if (getFILEData.type?.includes("image") || getFILEData.type?.includes("audio")) {
        // const getBufferObject = Buffer.from(body[0].data.buffer).toString("base64");
        const getBufferObject = await convertFileTOBase64(getFILEData);
        const file = await event.context.prisma.file.create({
          data: {
            title: getFILEData.name?.split(".")[0] ?? "default",
            file_binary: getBufferObject,
            file_type: getFILEData.type === "audio/mpeg" ? "Audio" : "Image",
          },
        });

        return file;
      }
    }
    return null;
  } catch (error) {
    const errorResult = error as H3Error;
    throw createError({
      statusCode: errorResult.statusCode,
      message: errorResult.message,
      statusMessage: errorResult.statusMessage,
    });
  }
});
