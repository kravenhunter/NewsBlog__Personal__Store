import bcrypt from "bcrypt";
import type { H3Error } from "h3";

interface IProp {
  email: string;
  userName: string;
  password: string;
  gender: string;
}
export default defineEventHandler(async (event) => {
  const { email, userName, password, gender } = await readBody<IProp>(event);

  try {
    if (!email || !userName || !password) {
      throw createError({
        statusCode: 405,
        statusMessage: "Bad Request",
        message: "Missing required fields ",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (!event.context.prisma) {
      if (!email || !userName || !password) {
        throw createError({
          statusCode: 405,
          statusMessage: "Bad Request",
          message: "Prisma instatce  is undefined",
        });
      }
    }
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     name: userName,
    //     hashedPassword,
    //   },
    // });
    const user = await event.context.prisma.user.create({
      data: {
        email,
        name: userName,
        hashedPassword,
        User_Credentials: {
          create: {
            userNameField: userName,
            emailField: email,
            accessPanel: false,
            genderField: gender === "Male" ? "Male" : "Female",
          },
        },
      },
    });

    return user;
  } catch (error) {
    const errorResult = error as H3Error;
    throw createError({
      statusCode: errorResult.statusCode,
      message: errorResult.message,
      statusMessage: errorResult.statusMessage,
    });
  }
});
