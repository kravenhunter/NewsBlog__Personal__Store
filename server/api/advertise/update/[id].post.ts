import { getServerSession } from "#auth";
import { convertFileTOBase64, extractFormData } from "~/server/utils";

interface IAdvertise {
  id: string;
  name: string;
  sourceId: string;
  source: File | string;
}
export default defineEventHandler(async (event) => {
  try {
    const session = await getServerSession(event);
    if (!session) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized",
      });
    }

    const formData = await readFormData(event);

    const getConverted = extractFormData<IAdvertise>(formData);

    if (getConverted.source instanceof File) {
      const getBufferObject = await convertFileTOBase64(getConverted.source);

      const getItem = await event.context.prisma.advertise.update({
        where: { id: event?.context?.params?.id },
        data: {
          name: getConverted.name,
          source: {
            create: {
              title: getConverted.source.name,
              file_type: "Image",
              file_binary: getBufferObject,
            },
          },
        },
        select: {
          id: true,
          name: true,
          source: true,
        },
      });
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "advertise",
        method: "update",
        objectResult: getItem,
      };
    } else {
      const getItem = await event.context.prisma.advertise.update({
        where: { id: event?.context?.params?.id },
        data: {
          name: getConverted.name,
          source: {
            connect: { id: getConverted.sourceId },
          },
        },
      });
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "advertise",
        method: "update",
        objectResult: getItem,
      };
    }
  } catch (error) {
    console.log(error);
    return error;
  }
  /*  body.array.forEach(async prod => {
      await prismaCLient.orderItem.create({
        data:{
            orderId: postCreate.id,
            productId: Number(prod.id), 
        }
      })
  }); */
});
