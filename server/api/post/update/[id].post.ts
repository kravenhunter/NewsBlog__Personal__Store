import { getServerSession } from "#auth";
import type { Tag } from "@prisma/client";
import { converArrayToTags, convertFileTOBase64 } from "~/server/utils";

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

    // const getConverted = extractFormData(formData);

    for (const item in formData) {
      // const getData = getConverted[item as keyof typeof getConverted];
      const getData = formData.get(item);

      if (getData) {
        if (getData instanceof File) {
          const getBase64 = await convertFileTOBase64(getData);
          await event.context.prisma.post.update({
            where: { id: event?.context?.params?.id },
            data: {
              [item]: {
                create: {
                  title: getData.name,
                  file_type: "Image",
                  file_binary: getBase64,
                },
              },
            },
          });
        } else if (Array.isArray(getData)) {
          const categoryList = await event.context.prisma.tag.findMany();

          const tagsArr: Tag[] = converArrayToTags(getData as Array<string>, categoryList);

          await event.context.prisma.post.update({
            where: { id: event?.context?.params?.id },
            data: { tags: { connect: tagsArr } },
          });
        } else {
          await event.context.prisma.post.update({
            where: { id: event?.context?.params?.id },
            data: {
              [item]: getData,
            },
          });
        }
      }
    }

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
