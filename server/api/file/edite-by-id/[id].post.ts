import { getServerSession } from "#auth";
import type { H3Error } from "h3";

interface IProps {
  id: string;
  title: string;
  description?: string;
  file: File | string;
  tag: string;
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

    const getConverted = extractFormData<IProps>(formData);
    const category = await event.context.prisma.tag.findFirst({
      where: { title: getConverted.tag },
    });
    if (category) {
      if (getConverted.file instanceof File) {
        const getBufferObject = await convertFileTOBase64(getConverted.file);

        const getItem = await event.context.prisma.file.update({
          where: { id: event?.context?.params?.id },
          data: {
            title: getConverted.title,
            file_type: "Image",
            file_binary: getBufferObject,
            description: getConverted.description ?? null,
            tag: {
              connect: { ...category },
            },
          },
          select: {
            id: true,
            title: true,
            file_type: true,
            file_binary: true,
            description: true,
            tag: true,
          },
        });
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "file",
          method: "update",
          objectResult: getItem,
        };
      } else {
        const getItem = await event.context.prisma.file.update({
          where: { id: event?.context?.params?.id },
          data: {
            title: getConverted.title,
            description: getConverted.description ?? null,
            tag: {
              connect: { ...category },
            },
          },
          select: {
            id: true,
            title: true,
            file_type: true,
            file_binary: true,
            description: true,
            tag: true,
          },
        });
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "file",
          method: "update",
          objectResult: getItem,
        };
      }
    }
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
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

// const extractFormData = (formData: FormData) => {
//   const titleData = formData.get("title");
//   const bodyData = formData.get("body");
//   const shortBodyData = formData.get("shortBody");
//   const authorData = formData.get("author");
//   const imageBg = formData.get("imageBg");
//   const imagePrev = formData.get("imagePrev");
//   const tagsData = formData.get("tags");
//   return {
//     title: titleData && (titleData as string),
//     body: bodyData && (bodyData as string),
//     shortBody: shortBodyData && (shortBodyData as string),
//     author: authorData && (authorData as string),
//     imageBg,
//     imagePrev,
//     tags: tagsData && Array.isArray(tagsData) && (tagsData as Array<string>),
//   };
// };

// const converToCurrentTags = (currenttagsArray: string[], tagList: Tag[]) => {
//   const tagsArr: Tag[] = [];

//   currenttagsArray.forEach((cat) => {
//     const getCat = tagList.find((x) => x.title === cat);
//     getCat && tagsArr.push(getCat);
//   });
//   return tagsArr;
// };

// const convertFileTOBase64 = async (file: File) => {
//   const fileBUffer = await file.arrayBuffer();
//   return Buffer.from(fileBUffer).toString("base64");
// };

// Поправить обновление
// export default defineEventHandler(async (event) => {
//   try {
//     const session = await getServerSession(event);
//     if (!session) {
//       throw createError({
//         statusCode: 401,
//         statusMessage: "Unauthorized",
//       });
//     }

//     const formData = await readFormData(event);

//     const getConverted = extractFormData(formData);

//     for (const item in getConverted) {
//       const getData = getConverted[item as keyof typeof getConverted];

//       if (getData instanceof File) {
//         const getBase64 = await convertFileTOBase64(getData);
//         await event.context.prisma.post.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             [item]: {
//               create: {
//                 title: getData.name,
//                 file_type: "Image",
//                 file_binary: getBase64,
//               },
//             },
//           },
//         });
//       } else if (Array.isArray(getData)) {
//         const categoryList = await event.context.prisma.tag.findMany();

//         const tagsArr: Tag[] = converToCurrentTags(getData as Array<string>, categoryList);

//         await event.context.prisma.post.update({
//           where: { id: event?.context?.params?.id },
//           data: { tags: { connect: tagsArr } },
//         });
//       } else {
//         await event.context.prisma.post.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             [item]: getData,
//           },
//         });
//       }
//     }

//     return "Success";
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
//   /*  body.array.forEach(async prod => {
//       await prismaCLient.orderItem.create({
//         data:{
//             orderId: postCreate.id,
//             productId: Number(prod.id),
//         }
//       })
//   }); */
// });
