import { getServerSession } from "#auth";
import type { H3Error, MultiPartData } from "h3";

interface IProps {
  title: string;
  body: string;
  shortBody: string;
  author: string;
  imageBg: MultiPartData;
  imagePrev: MultiPartData;
  tags: string;
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

    const formData = await readMultipartFormData(event);
    console.log("Post ID=========", event?.context?.params?.id);

    if (formData?.length) {
      const getConverted = extractMultipartData<IProps>(formData);

      const categoryList = await event.context.prisma.tag.findFirst({
        where: {
          title: getConverted.tags,
        },
      });

      if (getConverted.imageBg && getConverted.imagePrev) {
        const getImageBgBufferObject = await convertFileTOBase64(getConverted.imageBg);
        const getImagePrevBufferObject = await convertFileTOBase64(getConverted.imagePrev);
        const getPostTag = await event.context.prisma.post.findFirst({
          where: { id: event?.context?.params?.id },
          select: {
            title: true,
            tags: true,
          },
        });

        const getItem = await event.context.prisma.post.update({
          where: { id: event?.context?.params?.id },
          data: {
            title: getConverted.title,
            body: getConverted.body,
            shortBody: getConverted.shortBody,
            author: getConverted.author,
            tags: {
              connect: {
                id: categoryList?.id,
                title: categoryList?.title,
              },
            },
            imageBg: {
              create: {
                title: getConverted.imageBg.filename ?? getConverted.title,
                file_type: "Image",
                file_binary: getImageBgBufferObject,
              },
            },
            imagePrev: {
              create: {
                title: getConverted.imagePrev.filename ?? getConverted.title,
                file_type: "Image",
                file_binary: getImagePrevBufferObject,
              },
            },
          },
          select: {
            id: true,
            title: true,
            author: true,
            body: true,
            shortBody: true,
            imageBg: true,
            imagePrev: true,
            tags: true,
            Comment: true,
          },
        });
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "post",
          method: "update",
          objectResult: getItem,
        };
        // if(getPostTag && getPostTag.tags.some(el => el.title.includes(getConverted.title))){
        //   const getItem = await event.context.prisma.post.update({
        //     where: { id: event?.context?.params?.id },
        //     data: {
        //       title: getConverted.title,
        //       body: getConverted.body,
        //       shortBody: getConverted.shortBody,
        //       author: getConverted.author,
        //       imageBg: {
        //         create: {
        //           title: getConverted.imageBg.filename ?? getConverted.title,
        //           file_type: "Image",
        //           file_binary: getImageBgBufferObject,
        //         },
        //       },
        //       imagePrev: {
        //         create: {
        //           title: getConverted.imagePrev.filename ?? getConverted.title,
        //           file_type: "Image",
        //           file_binary: getImagePrevBufferObject,
        //         },
        //       },
        //     },
        //     select: {
        //       id: true,
        //       title: true,
        //       author: true,
        //       body: true,
        //       shortBody: true,
        //       imageBg: true,
        //       imagePrev: true,
        //       tags: true,
        //       Comment: true,
        //     },
        //   });
        //   return {
        //     statusCode: 200,
        //     statusMessage: "Success",
        //     table: "post",
        //     method: "update",
        //     objectResult: getItem,
        //   };
        // }else{

        //   const getItem = await event.context.prisma.post.update({
        //     where: { id: event?.context?.params?.id },
        //     data: {
        //       title: getConverted.title,
        //       body: getConverted.body,
        //       shortBody: getConverted.shortBody,
        //       author: getConverted.author,

        //       tags: {
        //         connect: {
        //           id: categoryList?.id,
        //           title: categoryList?.title,
        //         },
        //       },
        //       imageBg: {
        //         create: {
        //           title: getConverted.imageBg.filename ?? getConverted.title,
        //           file_type: "Image",
        //           file_binary: getImageBgBufferObject,
        //         },
        //       },
        //       imagePrev: {
        //         create: {
        //           title: getConverted.imagePrev.filename ?? getConverted.title,
        //           file_type: "Image",
        //           file_binary: getImagePrevBufferObject,
        //         },
        //       },
        //     },
        //     select: {
        //       id: true,
        //       title: true,
        //       author: true,
        //       body: true,
        //       shortBody: true,
        //       imageBg: true,
        //       imagePrev: true,
        //       tags: true,
        //       Comment: true,
        //     },
        //   });
        //   return {
        //     statusCode: 200,
        //     statusMessage: "Success",
        //     table: "post",
        //     method: "update",
        //     objectResult: getItem,
        //   };
        // }
      } else {
        const getItem = await event.context.prisma.post.update({
          where: { id: event?.context?.params?.id },
          data: {
            title: getConverted.title,
            shortBody: getConverted.shortBody,
            body: getConverted.body,
            tags: {
              //отсоединяем связи
              set: [],
              //создаем новую связь
              connect: {
                id: categoryList?.id,
                title: categoryList?.title,
              },
            },
          },
          select: {
            id: true,
            title: true,
            author: true,
            body: true,
            shortBody: true,
            imageBg: true,
            imagePrev: true,
            tags: true,
            Comment: true,
          },
        });
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "post",
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
// Цикличное добавление
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

//     // const getConverted = extractFormData(formData);

//     for (const item of formData.keys()) {
//       // const getData = getConverted[item as keyof typeof getConverted];
//       const getData = formData.get(item);

//       if (getData) {
//         if (getData instanceof File) {
//           const getBase64 = await convertFileTOBase64(getData);
//           await event.context.prisma.post.update({
//             where: { id: event?.context?.params?.id },
//             data: {
//               [item]: {
//                 create: {
//                   title: getData.name,
//                   file_type: "Image",
//                   file_binary: getBase64,
//                 },
//               },
//             },
//           });
//         } else if (Array.isArray(getData)) {
//           const categoryList = await event.context.prisma.tag.findMany();

//           const tagsArr: Tag[] = converArrayToTags(getData as Array<string>, categoryList);

//           await event.context.prisma.post.update({
//             where: { id: event?.context?.params?.id },
//             data: { tags: { connect: tagsArr } },
//           });
//         } else {
//           await event.context.prisma.post.update({
//             where: { id: event?.context?.params?.id },
//             data: {
//               [item]: getData,
//             },
//           });
//         }
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
