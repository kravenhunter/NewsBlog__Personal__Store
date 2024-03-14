import { initFirebaseApp } from "@/utils/firebaseInitApp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { IError } from "types/IError";
import type { IUserCredentials } from "types/IUserCredentials";

export const useUserStore = defineStore("user-store", () => {
  const usersState = reactive({
    userList: [] as IUserCredentials[],
  });
  const authorizedUserCredentials = ref<IUserCredentials>();
  const isAutState = ref(false);
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });
  //Init Database Store
  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "users_credentials");

  // Init Image Store
  const galaryStore = useGalaryStore();
  const { uploadOnlyImage } = galaryStore;

  /**
   * async Function Returns  geUsersList result
   * @return { Promise<void>}  Promise<void>
   *
   **/
  async function geUsersList(): Promise<void> {
    usersState.userList = [];
    const q = query(colRefs, orderBy("userNameField", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usersState.userList.push({ id: doc.id, ...doc.data() });
      // console.log(`${doc.id} =>`, doc);
    });
  }

  /**
   * async Function Returns  createUserCredentials result
   * @param {  IUserCredentials} filList, state   FileList | undefined, : IUserCredentials
   * @return {Promise<IError>}Promise<IError>
   *
   **/
  const createUserCredentials = async (state: IUserCredentials): Promise<IError> => {
    await addDoc(colRefs, {
      emailField: state.emailField,
      userNameField: state.userNameField,
      firstNameField: state.firstNameField,
      lastNameField: state.lastNameField,
      phoneField: state.phoneField,
      genderField: state.genderField,
      birthdayField: state.birthdayField,
      adressField: state.adressField,
      accessPanel: state.accessPanel,
      avatarField:
        "https://firebasestorage.googleapis.com/v0/b/newsblog-bbdd6.appspot.com/o/avatars%2Fsponge-bob-profile-picture-thypix-124-680x700.jpg?alt=media&token=c270a0de-38d5-46bd-924a-83ec1458dd69",
      avatarImageMeta: "sponge-bob-profile-picture-thypix-124-680x700.jpg",
      date: (state.date = Date.now()),
    })
      .then(() => {
        console.log("User Created");
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "User is  Created";
      })
      .catch((error) => {
        console.log("Error creating user", error.message);
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });

    return errorStatus.value;
  };

  /**
   * async Function Returns  updateUserCredentials result
   * @param {  FileList | undefined,  IUserCredentials} filList, state   FileList | undefined, : IUserCredentials
   * @return {Promise<IError>}Promise<IError>
   *
   **/
  const updateUserCredentials = async (
    filList: FileList | undefined,
    state: IUserCredentials,
  ): Promise<IError> => {
    if (!filList) {
      state.accessPanel = false;
      await updateDoc(doc(colRefs, state.id), {
        emailField: state.emailField,
        userNameField: state.userNameField,
        firstNameField: state.firstNameField,
        lastNameField: state.lastNameField,
        phoneField: state.phoneField,
        genderField: state.genderField,
        birthdayField: state.birthdayField,
        adressField: state.adressField,
        accessPanel: state.accessPanel,
        avatarField: state.avatarField,
        avatarImageMeta: state.avatarImageMeta,
        date: (state.date = Date.now()),
      })
        .then(() => {
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "UserCredentials is updated";
        })
        .catch(() => {
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        });
    } else {
      const getLink = await uploadOnlyImage(filList);
      await updateDoc(doc(colRefs, state.id), {
        emailField: state.emailField,
        userNameField: state.userNameField,
        firstNameField: state.firstNameField,
        lastNameField: state.lastNameField,
        phoneField: state.phoneField,
        genderField: state.genderField,
        birthdayField: state.birthdayField,
        adressField: state.adressField,
        accessPanel: state.accessPanel,
        avatarField: getLink.url,
        avatarImageMeta: getLink.metaName,
        date: (state.date = Date.now()),
      })
        .then(() => {
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "UserCredentials is updated";
        })
        .catch(() => {
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        });
    }
    return errorStatus.value;
  };

  /**
   * async Function Returns  getUserById result
   * @param {  string} id string
   * @return { IUserCredentials | undefined} IUserCredentials | undefined
   *
   **/
  const getUserById = (id: string): IUserCredentials | undefined => {
    const getItem = usersState.userList.find((el) => el.id === id);

    return getItem;
  };

  /**
   * Function Returns  getUserByEmail result
   * @return {Promise< IUserCredentials | undefined> } Promise IUserCredentials | undefined
   *
   **/
  const getUserByEmail = async (email: string): Promise<IUserCredentials | undefined> => {
    !usersState.userList.length && (await geUsersList());
    const getItem = usersState.userList.find((el) => el.emailField === email);

    return getItem;
  };

  /**
   * async Function Returns  isUserExist result
   * @param {  string} email string
   * @return { Promise<boolean>} Promise  boolean
   *
   **/
  const isUserExist = async (email: string): Promise<boolean> => {
    await geUsersList();
    return usersState.userList.some((el) => el.emailField === email);
  };

  /**
   * async Function Returns  deleteUser result
   * @param {  string | undefined} id  string | undefined
   * @return { Promise<void>} Promise  void
   *
   **/
  const deleteUser = async (id: string | undefined): Promise<void> => {
    id &&
      (await deleteDoc(doc(colRefs, id))
        .then(() => {
          usersState.userList = usersState.userList.filter((el) => el.id !== id);
        })
        .catch(() => console.log("error delet Article")));
  };

  /**
   * async Function Returns  sortByDate result
   * @return { Promise<void>}   Promise void
   *
   **/
  const sortByDate = async (): Promise<void> => {
    // const q = query(
    //   collection($firestoreDb as Firestore, 'posts'),
    //   orderBy('author', 'asc'),
    //   limit(3),
    // );
    const q = query(colRefs, orderBy("date", "asc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usersState.userList.push({ id: doc.id, ...doc.data() });
    });
  };
  return {
    usersState,
    isAutState,
    authorizedUserCredentials,
    getUserByEmail,
    isUserExist,
    getUserById,
    createUserCredentials,
    updateUserCredentials,
    geUsersList,
    sortByDate,
    deleteUser,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
