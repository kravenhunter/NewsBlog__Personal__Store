import { initFirebaseApp } from "@/utils/firebaseInitApp";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

import { acceptHMRUpdate, defineStore } from "pinia";

import type { IError } from "types/IError";

interface IAboutUs {
  id?: string;
  title?: string;
  aboutContent?: string;
  date?: number;
}

export const useAboutUsStore = defineStore("about", () => {
  initFirebaseApp();
  const aboutUs = ref<IAboutUs>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "about_us");

  /**
   * async Function Returns  addAbout result
   * @param {IAboutUs} about   about
   * @return {Promise<IError>}  Promise status result 200 or 405.
   *
   **/
  const addAbout = async (about: IAboutUs) => {
    about.date = Date.now();

    await addDoc(colRefs, {
      title: about.title,
      aboutContent: about.aboutContent,
      date: about.date,
    })
      .then(() => {
        console.log("Added");
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "About is added";
      })
      .catch(() => {
        console.log("Added");
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });

    return errorStatus.value;
  };

  /**
   * async Function Returns  updateAboutUs result
   * @param {IAboutUs} about   about
   * @return {Promise<IError>}  Promise status result 200 or 405.
   *
   **/
  const updateAboutUs = async (about: IAboutUs) => {
    about.date = Date.now();
    console.log("updateAboutUs", about);

    await updateDoc(doc(colRefs, about.id), {
      title: about.title,
      aboutContent: about.aboutContent,
      date: about.date,
    })
      .then(() => {
        console.log("Updated");
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "About is Updated";
      })
      .catch((error) => {
        console.log("Error", error);
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });
  };

  /**
   * async Function Returns  getAboutUs
   * @param {IAboutUs} about   about
   * @return {Promise<void>}  void
   *
   **/
  const getAboutUs = async () => {
    const docData = await getDocs(colRefs);
    docData.forEach((doc) => {
      aboutUs.value = { id: doc.id, ...doc.data() };
    });
  };

  /**
   * async Function Returns  getCurrentRecord
   * @param {string} id   id record
   * @return {Promise<void>}  void
   *
   **/
  const getCurrentRecord = async (id: string) => {
    const docData = await getDoc(doc(colRefs, id));

    aboutUs.value = { id: docData.id, ...docData.data() };
  };

  return {
    aboutUs,
    addAbout,
    getAboutUs,
    getCurrentRecord,
    updateAboutUs,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAboutUsStore, import.meta.hot));
}
