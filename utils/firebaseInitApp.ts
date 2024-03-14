import { getApp, getApps, initializeApp } from "firebase/app";

export const initFirebaseApp = () => {
  const config = useRuntimeConfig();

  if (getApps().length === 0) {
    const newApp = initializeApp({
      apiKey: config.public.apiKey,
      authDomain: config.public.authDomain,
      projectId: config.public.projectId,
      storageBucket: config.public.storageBucket,
      messagingSenderId: config.public.messagingSenderId,
      appId: config.public.appId,
    });
    return newApp;
  }

  const existedApp = getApp();

  return existedApp;
};
