import { getServerSession } from "#auth";
import type { H3Error, MultiPartData } from "h3";

// import type { ICategory } from "~/types";

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

    if (formData?.length) {
      const getConverted = extractMultipartData<IProps>(formData);

      const categoryList = await event.context.prisma.tag.findFirst({
        where: {
          title: getConverted.tags,
        },
      });

      const getImageBgBufferObject = await convertFileTOBase64(getConverted.imageBg);
      const getImagePrevBufferObject = await convertFileTOBase64(getConverted.imagePrev);

      // const getTags = converArrayToTags(getConverted.tags, categoryList);

      const getItem = await event.context.prisma.post.create({
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
        method: "create",
        objectResult: getItem,
      };
    }
    return {
      statusCode: 400,
      statusMessage: "Form data is empty",
      table: "post",
    };
  } catch (error) {
    console.log(error);

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
//     const titleData = formData.get("title");
//     const bodyData = formData.get("body");
//     const shortBodyData = formData.get("shortBody");
//     const authorData = formData.get("author");
//     const imageBgFileData = formData.get("imageBg");
//     const imagePrevFileData = formData.get("imagePrev");
//     const tagsData = formData.get("tags");

//     if (
//       titleData &&
//       bodyData &&
//       shortBodyData &&
//       imageBgFileData &&
//       imagePrevFileData &&
//       tagsData &&
//       Array.isArray(tagsData) &&
//       authorData &&
//       imagePrevFileData instanceof File &&
//       imagePrevFileData.type.includes("image") &&
//       imageBgFileData instanceof File &&
//       imageBgFileData.type.includes("image")
//     ) {
//       const categoryList = await event.context.prisma.tag.findMany();
//       const tagsArr: Tag[] = [];
//       const converArr = (tagsData as Array<string>).forEach((cat) => {
//         const getCat = categoryList.find((x) => x.title === cat);
//         getCat && tagsArr.push(getCat);
//       });
//       const getImageBgBuffer = await imageBgFileData.arrayBuffer();
//       const getImagePrevFileBuffer = await imagePrevFileData.arrayBuffer();
//       const getImageBgBufferObject = Buffer.from(getImageBgBuffer).toString("base64");
//       const getImagePrevBufferObject = Buffer.from(getImagePrevFileBuffer).toString("base64");

//       const postCreate = await event.context.prisma.post.create({
//         data: {
//           title: titleData as string,
//           body: bodyData as string,
//           shortBody: shortBodyData as string,
//           author: authorData as string,
//           tags: {
//             connect: tagsArr,
//           },

//           imageBg: {
//             create: {
//               title: imageBgFileData.name,
//               file_type: "Image",
//               file_binary: getImageBgBufferObject,
//             },
//           },
//           imagePrev: {
//             create: {
//               title: imagePrevFileData.name,
//               file_type: "Image",
//               file_binary: getImagePrevBufferObject,
//             },
//           },
//         },
//       });
//       return postCreate;
//     }

//     return null;
//   } catch (error) {
//     throw createError({
//       statusCode: 500,
//       statusMessage: (error as Error).message,
//     });
//   }
// });
