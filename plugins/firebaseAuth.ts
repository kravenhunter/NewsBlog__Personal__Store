// import { isAuthorized } from '@/utils/firebaseAuth/isAuthorized';
// import { getApp, getApps, initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCJIaOhWIxa0PlXHRizLdAn6lcXpA4_Lqo',
//   authDomain: 'maket-nuxt-3.firebaseapp.com',
//   projectId: 'maket-nuxt-3',
//   storageBucket: 'maket-nuxt-3.appspot.com',
//   messagingSenderId: '816568695152',
//   appId: '1:816568695152:web:e04466d881c1cf8fdb37b5',
//   measurementId: 'G-Y98RNEE6ZR',
// };
const firebaseConfig = {
  apiKey: "AIzaSyC7c8wxfGdwSR8T_IfJAvixOchxD-lOoOA",
  authDomain: "newsblog-bbdd6.firebaseapp.com",
  projectId: "newsblog-bbdd6",
  storageBucket: "newsblog-bbdd6.appspot.com",
  messagingSenderId: "525045867429",
  appId: "1:525045867429:web:00fe761247d4887ed7be4c",
};

export default defineNuxtPlugin((NuxtApp) => {
  // const runtimeConfig = useRuntimeConfig();
  // const firebaseConfig = {
  //   apiKey: runtimeConfig.public.apiBase,
  // };
  // if (getApps().length === 0) {
  //   const app = initializeApp(firebaseConfig);
  //   const firestoreDb = getFirestore(app);
  //   NuxtApp.vueApp.provide('firestoreDb', firestoreDb);
  //   NuxtApp.provide('firestoreDb', firestoreDb);
  //   NuxtApp.vueApp.provide('farebaseApp', app);
  //   NuxtApp.provide('farebaseApp', app);
  // }
  // const app = getApp();
  // Проверяем юзера и создаем куки useFereBase.ts
  // isAuthorized();
  // получаем данные пользователя при загрузки приложения
  // const getAuthorizedUser = getAuth();
  // В переменной хранится клиентский конфиг
  // const getAuthorizedUser = getAuth(app);
  // делаем глобальные объект доступак к данным пользователя, будет видет во всех дочерних компонентах, так как
  // указали родителем  само приложение NuxtApp и vueApp
  // таким образом не придотся импортировать объект каждый раз из firebase
  // Используется в plugins/authMiddlewarePlugin
  // NuxtApp.vueApp.provide('getAuthorizedUser', getAuthorizedUser);
  // NuxtApp.provide('getAuthorizedUser', getAuthorizedUser);
  // console.log('initializeApp firebase', app);
  // console.log('getApps().length', getApps().length);
});
