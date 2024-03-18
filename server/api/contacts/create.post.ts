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
    const contactData = await event.context.prisma.contacts.create({
      data: {
        ...body,
        Socials: {
          create: body.socials, // [...body.socials]
        },
      },
    });
    return contactData;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
