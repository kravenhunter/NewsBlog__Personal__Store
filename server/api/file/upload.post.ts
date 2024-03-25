import { getServerSession } from "#auth";

import type { H3Error, MultiPartData } from "h3";
import { convertFileTOBase64 } from "~/server/utils/convertFileTOBase64";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { write_To_File } from "~/server/utils/saving_file_helper";

interface IProps {
  id: string;
  title: string;
  description?: string;
  image_file: MultiPartData;
  audio_file?: MultiPartData;
  type: string;
  tag: string;
  authorId: string;
}

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  try {
    const multipartBody = await readMultipartFormData(event);

    if (multipartBody?.length) {
      const getConverted = extractMultipartData<IProps>(multipartBody);

      const category = await event.context.prisma.tag.findFirst({
        where: { title: getConverted.tag },
      });

      if (category && getConverted.image_file) {
        if (getConverted.type.includes("image")) {
          const getBufferObject = await convertFileTOBase64(getConverted.image_file);

          const getItem = await event.context.prisma.file.create({
            data: {
              title: getConverted.title,
              file_type: "Image",
              file_binary: getBufferObject,
              description: getConverted.description,
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
              // advertise_Id: undefined,
              // imageBg_Id: undefined,
              // imagePrev_Id: undefined,
              // credentialsId: undefined,
              // Advertise: { where: { id: undefined } },
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "file",
            method: "create",
            //  objectResult: { ...getItem, category: getItem.tag },
          };
        } else if (getConverted.type?.includes("audio") && getConverted.audio_file) {
          const getBufferObject = await convertFileTOBase64(getConverted.image_file);
          const getFullNameAudioFile = await write_To_File(getConverted.audio_file);

          const getItem = await event.context.prisma.file.create({
            data: {
              title: getConverted.title,
              file_type: "Audio",
              file_binary: getBufferObject,
              adition_binary: `/audio/upload/${getFullNameAudioFile}`,
              description: getConverted.description,
              tag: {
                connect: { ...category },
              },
              User_Credentials: {
                connect: {
                  id: getConverted.authorId,
                },
              },
            },
            // select: {
            //   id: true,
            //   title: true,
            //   file_type: true,
            //   file_binary: true,
            //   description: true,
            //   tag: true,
            //   User_Credentials: true,
            //   // advertise_Id: undefined,
            //   // imageBg_Id: undefined,
            //   // imagePrev_Id: undefined,
            //   // credentialsId: undefined,
            //   // Advertise: { where: { id: undefined } },
            // },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "podcasts",

            //objectResult: { ...getItem, User: getItem.User_Credentials, category: getItem.tag },
          };
        } else {
          throw createError({
            statusCode: 400,
            statusMessage: "Wrong file type",
          });
        }
      } else {
        return {
          statusCode: 400,
          statusMessage: "Wrong category or FILE instance is empty , the instance isn't created",
          table: "file",
        };
      }
    }
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.message,
    });
  }
});

// Вариант с readFormData

// export default defineEventHandler(async (event) => {
//   const session = await getServerSession(event);
//   if (!session) {
//     throw createError({
//       statusCode: 401,
//       statusMessage: "Unauthorized",
//     });
//   }

//   try {
//     const formData = await readFormData(event);

//     const getConverted = extractFormData<IProps>(formData);

//     const category = await event.context.prisma.tag.findFirst({
//       where: { title: getConverted.tag },
//     });
//     console.log(formData);

//     if (category && getConverted.image_file instanceof File) {
//       if (getConverted.type.includes("image")) {
//         const getBufferObject = await convertFileTOBase64(getConverted.image_file);
//         const getItem = await event.context.prisma.file.create({
//           data: {
//             title: getConverted.title,
//             file_type: "Image",
//             file_binary: getBufferObject,
//             description: getConverted.description,
//             tag: {
//               connect: { ...category },
//             },
//           },
//           select: {
//             id: true,
//             title: true,
//             file_type: true,
//             file_binary: true,
//             description: true,
//             tag: true,
//             // advertise_Id: undefined,
//             // imageBg_Id: undefined,
//             // imagePrev_Id: undefined,
//             // credentialsId: undefined,
//             // Advertise: { where: { id: undefined } },
//           },
//         });
//         return {
//           statusCode: 200,
//           statusMessage: "Success",
//           table: "file",
//           method: "create",
//           objectResult: { ...getItem, category: getItem.tag },
//         };
//       } else if (getConverted.type?.includes("audio") && getConverted.audio_file instanceof File) {
//         const getBufferImageObject = await convertFileTOBase64(getConverted.image_file);
//         // const getBufferAudioObject = await convertFileTOBase64(getConverted.audio_file);
//         const getullNameAudioFile  = await write_To_File(getConverted.audio_file);
//         const getItem = await event.context.prisma.file.create({
//           data: {
//             title: getConverted.title,
//             file_type: "Audio",
//             file_binary: getBufferImageObject,
//             adition_binary: getBufferAudioObject,
//             description: getConverted.description,
//             tag: {
//               connect: { ...category },
//             },
//             User_Credentials: {
//               connect: {
//                 id: getConverted.authorId,
//               },
//             },
//           },
//           // select: {
//           //   id: true,
//           //   title: true,
//           //   file_type: true,
//           //   file_binary: true,
//           //   description: true,
//           //   tag: true,
//           //   User_Credentials: true,
//           //   // advertise_Id: undefined,
//           //   // imageBg_Id: undefined,
//           //   // imagePrev_Id: undefined,
//           //   // credentialsId: undefined,
//           //   // Advertise: { where: { id: undefined } },
//           // },
//         });
//         return {
//           statusCode: 200,
//           statusMessage: "Success",
//           table: "podcasts",
//           // method: "create",
//           // objectResult: { ...getItem, User: getItem.User_Credentials, category: getItem.tag },
//         };
//       } else {
//         throw createError({
//           statusCode: 400,
//           statusMessage: "Wrong file type",
//         });
//       }
//     } else {
//       return {
//         statusCode: 400,
//         statusMessage: "Wrong category or FILE instance is empty , the instance isn't created",
//         table: "file",
//       };
//     }
//   } catch (error) {
//     const getError = error as H3Error;
//     throw createError({
//       statusCode: getError.statusCode,
//       statusMessage: getError.message,
//     });
//   }
// });

// Вариант с readMultipartFormData
// export default defineEventHandler(async (event) => {
//   try {
//     const session = await getServerSession(event);
//     const body = await readMultipartFormData(event);

//     if (!session) {
//       throw createError({
//         statusCode: 401,
//         statusMessage: "Unauthorized",
//       });
//     }

//     if (body?.length) {
//       // MultiPartData содержит буфер изображения
//       // преоббразуем в Buffer и потом в строку формата base64

//       const getFILEData = body[0];

//       if (getFILEData.type?.includes("image") || getFILEData.type?.includes("audio")) {
//         // const getBufferObject = Buffer.from(body[0].data.buffer).toString("base64");
//         const getBufferObject = await convertFileTOBase64(getFILEData);
//         const file = await event.context.prisma.file.create({
//           data: {
//             title: getFILEData.name?.split(".")[0] ?? "default",
//             file_binary: getBufferObject,
//             file_type: getFILEData.type === "audio/mpeg" ? "Audio" : "Image",
//           },
//         });

//         return file;
//       }
//     }
//     return null;
//   } catch (error) {
//     const errorResult = error as H3Error;
//     throw createError({
//       statusCode: errorResult.statusCode,
//       message: errorResult.message,
//       statusMessage: errorResult.statusMessage,
//     });
//   }
// });
