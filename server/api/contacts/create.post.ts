import { getServerSession } from "#auth";
import type { H3Error } from "h3";

interface ISocials {
  title: string;
  link: string;
}
interface IProps {
  adress: string;
  copyright: string;
  email: string;
  phone: string;
  socials: ISocials[];
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
    // console.log(event.context.prisma);

    const body = await readBody<IProps>(event);
    const contactData = await event.context.prisma.contacts.create({
      data: {
        ...body,
        Socials: {
          create: body.socials, // [...body.socials]
        },
      },
    });
    return {
      statusCode: 200,
      statusMessage: "Success",
    };
  } catch (error) {
    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.message,
    });
  }
});
