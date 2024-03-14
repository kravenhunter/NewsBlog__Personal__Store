/* eslint-disable @typescript-eslint/consistent-type-imports */
import { initFirebaseApp } from "@/utils/firebaseInitApp";
import {
  CollectionReference,
  DocumentData,
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

import type { IError } from "types/IError";
import type { INavigation } from "types/INavigation";

interface IFooterNavigation {
  id?: string;
  title?: string;
  path?: string;
  date?: number;
}
export const useNavStorage = defineStore("navigation-store", () => {
  const navLinks = ref<INavigation[]>();
  const footerLinks = ref<INavigation[]>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });

  initFirebaseApp();
  const firestoreDb = getFirestore();
  const navRefs = collection(firestoreDb, "navigation");
  const footerRefs = collection(firestoreDb, "footer_links");
  /**
   * async Function Returns  addNewItem result
   * @param { INavigation | undefined, IFooterNavigation | undefined } headerLink, footerLinks    INavigation | undefined, IFooterNavigation | undefined
   * @return { Promise<IError>} Promise  IError
   *
   **/
  async function addNewItem(
    headerLink: INavigation | undefined,
    footerLinks: IFooterNavigation | undefined,
  ) {
    let colRefs: CollectionReference<DocumentData, DocumentData> | undefined;
    let linkItem: INavigation | IFooterNavigation | undefined;

    // headerLink && (colRefs = navRefs, linkItem = headerLink )
    if (headerLink) {
      colRefs = navRefs;
      linkItem = headerLink;
    } else if (footerLinks) {
      colRefs = footerRefs;
      linkItem = footerLinks;
    }

    linkItem?.date && (linkItem.date = Date.now());

    colRefs &&
      (await addDoc(colRefs, { ...linkItem })
        .then(async () => {
          console.log("Added");
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "About is added";
        })
        .catch(() => {
          console.log("Added");
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        }));

    if (errorStatus.value.statusCode === 200) {
      headerLink && (await getList());
      footerLinks && (await getFooterList());
    }

    return errorStatus.value;
  }
  function instanceOfooterNav(object: any): object is IFooterNavigation {
    return true;
  }

  function instanceOHeaderNav(object: any): object is INavigation {
    return true;
  }

  /**
   * async Function Returns  addFooterLink result
   * @param { IFooterNavigation | INavigation} newItem    IFooterNavigation | INavigation
   * @return { Promise<void>} Promise  void
   *
   **/
  async function addFooterLink(newItem: IFooterNavigation | INavigation) {
    if (instanceOfooterNav(newItem)) {
      console.log("IFooterNavigation", true);
    }
    if (instanceOHeaderNav(newItem)) {
      console.log("INavigation", true);
    }
  }

  /**
   * async Function Returns  updateItem result
   * @param {INavigation} newItem   INavigation
   * @return { Promise<void>} Promise  void
   *
   **/
  async function updateItem(newItem: INavigation) {
    newItem.date = Date.now();
    await updateDoc(doc(navRefs, newItem.id), { ...newItem });
  }

  /**
   * async Function Returns  getList result
   * @return { Promise<void>} Promise  void
   *
   **/
  async function getList() {
    navLinks.value = [];
    const docData = await getDocs(navRefs);
    docData.forEach((doc) => {
      navLinks.value?.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  getFooterList result
   * @return { Promise<void>} Promise  void
   *
   **/
  async function getFooterList() {
    footerLinks.value = [];
    const docData = await getDocs(footerRefs);
    docData.forEach((doc) => {
      footerLinks.value?.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  getCurrentItem result
   * @param {string} id   string
   * @return { Promise<string>} Promise  string
   *
   **/
  async function getCurrentItem(id: string) {
    const docData = await getDoc(doc(navRefs, id));

    return { id: docData.id, ...docData.data() };
  }

  /**
   * async Function Returns  deleteItem result
   * @param {string} id   string
   * @return { Promise<void>} Promise  void
   *
   **/
  async function deleteItem(id: string) {
    await deleteDoc(doc(navRefs, id)).then(() => {
      navLinks.value = navLinks.value?.filter((el) => el.id !== id);
    });
  }

  /**
   * async Function Returns  deleteFooterLink result
   * @param {string} id   string
   * @return { Promise<void>} Promise  void
   *
   **/
  async function deleteFooterLink(id: string) {
    id &&
      (await deleteDoc(doc(footerRefs, id)).then(() => {
        footerLinks.value = footerLinks.value?.filter((el) => el.id !== id);
      }));
  }
  return {
    navLinks,
    footerLinks,
    getFooterList,
    addFooterLink,
    addNewItem,
    deleteItem,
    updateItem,
    getList,
    getCurrentItem,
    deleteFooterLink,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNavStorage, import.meta.hot));
}
