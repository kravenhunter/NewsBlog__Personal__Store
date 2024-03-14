import { initFirebaseApp } from "@/utils/firebaseInitApp";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { ICategory } from "types/ICategory";
import type { IError } from "types/IError";

export const useCategoryStorage = defineStore("category-store", () => {
  const categoryState = ref<ICategory[]>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });

  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "categories");

  /**
   * async Function Returns  addCategory result
   *  @param {ICategory} newItem   ICategory
   * @return {Promise<IError>}  Promise IError
   *
   **/
  async function addCategory(newItem: ICategory): Promise<IError> {
    newItem.date = Date.now();

    await addDoc(colRefs, { ...newItem })
      .then(async () => {
        console.log("Added");
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "About is added";
      })
      .catch(() => {
        console.log("Added");
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });
    // await addDoc(collection($firestoreDb as Firestore, 'posts'), { ...state });

    errorStatus.value.statusCode === 200 && (await getGategoryList());

    return errorStatus.value;
  }
  /**
   * async Function Returns  updateCategory result
   *  @param {ICategory} newItem   ICategory
   * @return {Promise<IError>}  Promise IError
   *
   **/
  async function updateCategory(newItem: ICategory): Promise<IError> {
    newItem.date = Date.now();
    await updateDoc(doc(colRefs, newItem.id), { ...newItem })
      .then(async () => {
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "Updated";
      })
      .catch(() => {
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });
    return errorStatus.value;
  }
  /**
   * async Function Returns  getGategoryList result
   * @return {Promise<void>}  Promise void
   *
   **/
  async function getGategoryList(): Promise<void> {
    categoryState.value = [];

    const docData = await getDocs(colRefs);
    docData.forEach((doc) => {
      categoryState.value?.push({ id: doc.id, ...doc.data() });
    });
  }
  /**
   * async Function Returns  getCurrentCategory result
   *  @param {string} id   string
   * @return {Promise<ICategory>} Promise  ICategory
   *
   **/
  async function getCurrentCategory(id: string): Promise<ICategory> {
    const docData = await getDoc(doc(colRefs, id));

    return { id: docData.id, ...docData.data() };
    // await updateDoc(doc(collection($firestoreDb as Firestore, 'posts'), id), state);
  }

  /**
   * async Function Returns  deleteCategory result
   *  @param {string} id   string
   * @return { Promise<void>}   Promise<void>
   *
   **/
  async function deleteCategory(id: string): Promise<void> {
    await deleteDoc(doc(colRefs, id)).then(() => {
      categoryState.value = categoryState.value?.filter((el) => el.id !== id);
    });
  }
  /**
   * async Function Returns  isExistCategory
   *  @param {string} name   name
   * @return {boolean}  boolean
   *
   **/
  const isExistCategory = (name: string) =>
    categoryState.value?.some((el) => el.title?.toLocaleLowerCase() === name.toLocaleLowerCase());
  return {
    categoryState,
    isExistCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    getGategoryList,
    getCurrentCategory,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryStorage, import.meta.hot));
}
