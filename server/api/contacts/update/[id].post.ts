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

    // const getConverted = extractFormData<IContacts>(formData);

    await event.context.prisma.contacts.update({
      where: { id: event?.context?.params?.id },
      data: {
        ...body,
        Socials: {
          create: body.socials && body.socials,
        },
      },
    });
    return "Success";
  } catch (error) {
    console.log(error);
    return error;
  }
});
