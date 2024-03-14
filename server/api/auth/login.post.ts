import { firebaseServerAuthHelper } from '@/server/utils/firebaseServerAuthHelper';
import { getAuth } from 'firebase-admin/auth';

interface ResponseType {
  statusCode: number;
  body: string;
}

export default defineEventHandler(async (event) => {
  //Initialize server config
  firebaseServerAuthHelper();

  const { idToken } = await readBody(event);
  const expiresIn = 60 * 60 * 24 * 1 * 1000; // 1 day
  //   const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 day
  try {
    //create session cookie on the firebase server side
    const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn, httpOnly: true, secure: true, samiSite: 'none' };
    setCookie(event, 'userCookies', sessionCookie, options);
    return {
      statusCode: 200,
      body: JSON.stringify({ status: 'Auth Success' }),
    } as ResponseType;
  } catch (error) {
    console.log('login api  error', error);
    // return {
    //   statusCode: 401,
    //   error: 'UNAUTHORIZED REQUEST ',
    // };
    throw createError({
      statusCode: 401,
      statusMessage: 'UNAUTHORIZED REQUEST ',
    });
  }
});
