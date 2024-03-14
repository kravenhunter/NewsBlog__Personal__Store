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
} from "firebase/firestore";
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from "firebase/storage";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { IGalaryCard } from "types/IGalaryCard";
import { uuid } from "vue-uuid";

export const useAdvertiseStore = defineStore("advertise-store", () => {
  const advertiseList = reactive({
    storeList: [] as string[],
    databaseList: [] as IGalaryCard[],
  });
  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "advertise");
  const storage = getStorage();
  const listRef = ref(storage, "advertise/");
  /**
   * async Function Returns  getGalaryDBLimitList
   * @return {Promise<void>}  Promise void
   *
   **/

  async function getGalaryDBLimitList() {
    advertiseList.databaseList = [];
    const q = query(colRefs, orderBy("date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      advertiseList.databaseList.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  getAdvertiseList
   * @return {Promise<void>}  Promise void
   *
   **/
  async function getAdvertiseList() {
    advertiseList.databaseList = [];

    const querySnapshot = await getDocs(colRefs);
    querySnapshot.forEach((doc) => {
      advertiseList.databaseList.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  getGalaryStoreList
   * @return {Promise<IError>}  Promise status result 200 or 405.
   *
   **/
  //List from Database
  async function getGalaryStoreList() {
    await listAll(listRef).then((response) => {
      response.items.forEach(async (img) => {
        await getDownloadURL(img).then((url) => advertiseList.storeList.push(url));
      });
    });
  }

  /**
   * async Function Returns  uploadOnlyImage result
   * @param {FileList} files   about FileList
   * @return {Promise<string>}  Promise string
   *
   **/
  async function uploadOnlyImage(files: FileList) {
    // console.log('uploadToStorage', files);

    let link = "";
    const imageRef = ref(storage, `advertise/${uuid.v4() + files[0].name}`);
    await uploadBytes(imageRef, files[0])
      .then(async (response) => {
        await getDownloadURL(response.ref).then((url) => {
          link = url;
        });
      })
      .catch((err) => console.log(err));
    return link;
  }

  /**
   * async Function Returns  uploadToStorage result
   * @param {FileList} files   FileList
   *  @param {IGalaryCard} dataFORM   IGalaryCard
   * @return {Promise<boolean>}  Promise boolean
   *
   **/
  //Upload  to Farebase Storage
  async function uploadToStorage(files: FileList, dataFORM: IGalaryCard) {
    let isCreated = false;
    const imageRef = ref(storage, `advertise/${uuid.v4() + files[0].name}`);
    await uploadBytes(imageRef, files[0])
      .then(async (response) => {
        await getDownloadURL(response.ref).then((url) => (dataFORM.source = url));
      })
      .catch((err) => console.log(err));

    dataFORM?.source && (isCreated = await addToDatabase(dataFORM));

    isCreated && (await getAdvertiseList());
    return isCreated;
  }

  /**
   * async Function Returns  addToDatabase
   *  @param {IGalaryCard} dataFORM   IGalaryCard
   * @return {Promise<boolean>}  Promise boolean
   **/
  //Add record to Database
  async function addToDatabase(dataFORM: IGalaryCard) {
    return await addDoc(colRefs, {
      source: dataFORM.source,
      name: dataFORM.name,
      description: dataFORM.description,
      date: (dataFORM.date = Date.now()),
    })
      .then(() => true)
      .catch(() => false);
    // await addDoc(collection($firestoreDb as Firestore, 'posts'), { ...state });
  }
  /**
   * async Function Returns  deleteItem
   *  @param {string} id   string
   * @return {Promise<void>}  Promise void
   **/
  const deleteItem = async (id: string) => {
    await deleteDoc(doc(colRefs, id));
  };

  return {
    advertiseList,
    getAdvertiseList,

    getGalaryStoreList,
    uploadToStorage,
    getGalaryDBLimitList,
    uploadOnlyImage,
    deleteItem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAdvertiseStore, import.meta.hot));
}
