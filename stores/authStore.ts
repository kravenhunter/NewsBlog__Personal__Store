import { initFirebaseApp } from "@/utils/firebaseInitApp";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  type User,
} from "firebase/auth";
import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia";
import type { IError } from "types/IError";
import type { IUserCredentials } from "types/IUserCredentials";

export const useAuthStore = defineStore("auth-store", () => {
  const statAuth = reactive({
    authenticated: false,
    loading: false,
    authUser: {} as IUserCredentials,
  });
  const Isloading = computed(() => statAuth.loading);
  // Init farebase App
  initFirebaseApp();

  const { authorizedUserCredentials } = storeToRefs(useUserStore());
  const { isUserExist, createUserCredentials, getUserByEmail } = useUserStore();
  // get auth object result
  const auth = getAuth(); // в auth хранится конкретный юзер и прокидываем его конфигурацию в signOut для выхода

  /**
   * async Function Returns   createUser result
   * @param {String} userName  String
   *  @param {String} email  String
   *  @param {String} password   String
   * @return {Promise<IError>}  Promise IError status result 200 or 405.
   *
   **/
  async function createUser(userName: string, email: string, password: string): Promise<IError> {
    // initFirebaseApp();

    const checkUser = await isUserExist(email);

    if (checkUser) {
      return { statusCode: 405, message: "Dublicate email" } as IError;
    }

    // const credential: UserCredential | IError = await createUserWithEmailAndPassword(
    const result = await createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const resultCreate = await createUserCredentials({
          userNameField: userName,
          emailField: email,
          firstNameField: " ",
          lastNameField: " ",
          phoneField: " ",
          genderField: " ",
          birthdayField: " ",
          adressField: " ",
          accessPanel: false,
        });

        console.log(`StatusCode${resultCreate.statusCode} ${resultCreate.message} `);
        await signOutUser();
        return resultCreate;
      })
      .catch((error) => {
        return { statusCode: error.code, message: error.message } as IError;
        // ..
      });

    return result;
  }
  /**
   * async Function Returns  logInInUser result
   * @param {String} email  String
   *  @param {String} password   String
   * @return {Promise<IError>}  Promise status result 200 or 405.
   *
   **/
  async function logInInUser(email: string, password: string): Promise<IError> {
    statAuth.loading = true;
    const result = await signInWithEmailAndPassword(auth, email, password)
      .then(async (credentials) => {
        if (credentials?.user?.email) {
          const token = useCookie("firebaseToken"); // useCookie  hook in nuxt 3
          token.value = await credentials.user.getIdToken(); // set token to cookie
          statAuth.authenticated = true; // set authenticated  state value to true

          const resultUserSearch = await getUserByEmail(credentials?.user?.email);

          if (resultUserSearch) {
            statAuth.authUser = resultUserSearch;
            authorizedUserCredentials.value = resultUserSearch;
          }

          return {
            statusCode: 200,
            message: "User is login",
          } as IError;
        }

        return {
          statusCode: 401,
          message: "Error User is null",
        } as IError;
      })
      .catch((error) => {
        return {
          statusCode: 405,
          message: error.code,
        } as IError;
      });
    statAuth.loading = false;
    return result;
  }

  /**
   * async Function Returns   signOut result
   * @return {Promise<IError>}  Promise status result 200 or 405.
   *
   **/
  async function signOutUser(): Promise<IError> {
    const result = await auth
      .signOut()
      .then(() => {
        const token = useCookie("firebaseToken"); // useCookie  hook in nuxt 3
        statAuth.authenticated = false; // set authenticated  state value to false
        statAuth.authUser = {}; // clear user
        token.value = null; // clear the token cookie
        authorizedUserCredentials.value = {};
        return {
          statusCode: 200,
          message: "User is log out",
        } as IError;
      })
      .catch((error) => {
        return {
          statusCode: 405,
          message: error.code,
        } as IError;
      });

    return result;
  }

  /**First way to unsubscribe listener
   * async Function Returns   isAuthorized result
   * @return {Promise<User | null>}  Promise user credentials or null
   *
   **/

  function isAuthorized(): Promise<User | null> {
    statAuth.authUser = {}; // clear user
    return new Promise<User | null>((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        auth,
        async (user) => {
          removeListener();

          statAuth.authenticated = !!user;
          if (user?.email) {
            const resultUserSearch = await getUserByEmail(user.email);
            if (resultUserSearch) {
              statAuth.authUser = resultUserSearch;
              authorizedUserCredentials.value = resultUserSearch;
            }
          }
          resolve(user);
        },
        reject,
      );
    });
  }

  /**Second way to unsubscribe listener
   * async Function Returns   isAuthorized result
   * @return {Promise<User | null>}  Promise user credentials or null
   *
   **/
  /*   function firebaseAuth() {
    const user = ref<User | null>(null);

    const auth = getAuth();
    //Получаем подписку
    const unsubscribe = onAuthStateChanged(auth, (_user) => (user.value = _user));
    //   отписываемся при расмонтировании компонента - Удаляем listener
    // unsubscribe()
    onUnmounted(unsubscribe);

    const isLogIn = computed(() => !!user.value);
    // console.log(" Helper firebaseAuth user", user.value);
    // console.log(" Helper firebaseAuth isLogIn", isLogIn.value);

    return { user, isLogIn };
  }
 */
  return {
    statAuth,
    Isloading,
    createUser,
    logInInUser,
    signOutUser,
    isAuthorized,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
