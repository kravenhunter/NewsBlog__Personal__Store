import { getServerSession } from "#auth";
import { convertFileTOBase64, extractFormData } from "~/server/utils";

interface IAdvertise {
  name: string;
  source: File;
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

    const getBufferObject = await convertFileTOBase64(getConverted.source);

    await event.context.prisma.advertise.update({
      where: { id: event?.context?.params?.id },
      data: {
        ...getConverted,
        source: {
          create: {
            title: getConverted.source.name,
            file_type: "Image",
            file_binary: getBufferObject,
          },
        },
      },
    });
    return "Success";
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
