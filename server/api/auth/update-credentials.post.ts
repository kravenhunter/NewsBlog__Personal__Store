import { getServerSession } from "#auth";
import { convertFileTOBase64, extractFormData } from "~/server/utils";

interface ICredentials {
  id: string;
  accessPanel?: boolean;
  userNameField: string;
  adressField?: string;
  emailField: string;
  avatar?: File;
  firstNameField?: string;
  lastNameField?: string;
  phoneField?: string;
  genderField: string;
  birthdayField?: string;
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

    const getConverted = extractFormData<ICredentials>(formData);

    if (getConverted.avatar) {
      const getImageBgBufferObject = await convertFileTOBase64(getConverted.avatar);

      const result = await event.context.prisma.user.update({
        where: { id: event?.context?.params?.id },
        data: {
          User_Credentials: {
            update: {
              ...getConverted,
              genderField: getConverted.genderField === "Male" ? "Male" : "Female",
              avatar: {
                create: {
                  title: getConverted.avatar.name,
                  file_type: "Image",
                  file_binary: getImageBgBufferObject,
                },
              },
            },
          },
        },
      });
    } else {
      return {
        statusCode: 200,
        statusMessage: "Success",
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
