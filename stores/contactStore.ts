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

interface IContact {
  id?: string;
  copyright?: string;
  telephone?: string;
  email?: string;
  adreess?: string;
  fasbookLink?: string;
  twetter?: string;
  youtube?: string;
  instagramm?: string;
  vkontakte?: string;
  date?: number;
}
export const useContactStore = defineStore("contacts", () => {
  const stateData = ref<IContact>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });

  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "contacts");
  /**
   * async Function Returns  addContacts result
   *  @param {IContact} contacts   IContact
   * @return { Promise<IError>} Promise  IError
   *
   **/
  async function addContacts(contacts: IContact): Promise<IError> {
    contacts.date = Date.now();

    await addDoc(colRefs, { ...contacts })
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
    errorStatus.value.statusCode === 200 && (await getContacts());
    return errorStatus.value;
  }

  /**
   * async Function Returns  updateContacts result
   *  @param {IContact} contacts   IContact
   * @return { Promise<void>} Promise  void
   *
   **/
  async function updateContacts(contacts: IContact): Promise<void> {
    contacts.date = Date.now();
    await updateDoc(doc(colRefs, contacts.id), { ...contacts });
  }

  /**
   * async Function Returns  getContacts result
   * @return { Promise<void>}  Promise  void
   *
   **/
  async function getContacts(): Promise<void> {
    const docData = await getDocs(colRefs);
    docData.forEach((doc) => {
      stateData.value = { id: doc.id, ...doc.data() };
    });
  }
  /**
   * async Function Returns  getCurrentRecord result
   *  @param {string} id   string
   * @return { Promise<void>}   Promise  void
   *
   **/
  async function getCurrentRecord(id: string): Promise<void> {
    const docData = await getDoc(doc(colRefs, id));

    stateData.value = { id: docData.id, ...docData.data() };
  }

  return {
    stateData,
    addContacts,
    getContacts,
    getCurrentRecord,
    updateContacts,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot));
}
