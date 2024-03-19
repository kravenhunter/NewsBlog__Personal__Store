import { getServerSession } from "#auth";
import { converArrayToTags, convertFileTOBase64, extractFormData } from "~/server/utils";

interface IPost {
  title: string;
  body: string;
  shortBody: string;
  author: string;
  imageBg: File;
  imagePrev: File;
  tags: string[];
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
    const categoryList = await event.context.prisma.tag.findMany();

    const getConverted = extractFormData<IPost>(formData);

    const getImageBgBufferObject = await convertFileTOBase64(getConverted.imageBg);
    const getImagePrevBufferObject = await convertFileTOBase64(getConverted.imagePrev);

    const postCreate = await event.context.prisma.post.create({
      data: {
        ...getConverted,
        tags: {
          connect: converArrayToTags(getConverted.tags, categoryList),
        },

        imageBg: {
          create: {
            title: getConverted.imageBg.name,
            file_type: "Image",
            file_binary: getImageBgBufferObject,
          },
        },
        imagePrev: {
          create: {
            title: getConverted.imagePrev.name,
            file_type: "Image",
            file_binary: getImagePrevBufferObject,
          },
        },
      },
    });
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
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
