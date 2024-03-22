import { getServerSession } from "#auth";

interface ISocials {
  title: string;
  link: string;
}
interface IProps {
  adress: string;
  copyright: string;
  email: string;
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

    const body = await readBody<IProps>(event);

    const getItem = await event.context.prisma.contacts.update({
      where: { id: event?.context?.params?.id },
      data: {
        ...body,
        Socials: {
          create: body.socials && body.socials,
        },
      },
      select: {
        id: true,
        copyright: true,
        adress: true,
        date: true,
        phone: true,
        email: true,
        Socials: true,
      },
    });

    return {
      statusCode: 200,
      statusMessage: "Success",
      method: "update",
      objectResult: getItem,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
});
