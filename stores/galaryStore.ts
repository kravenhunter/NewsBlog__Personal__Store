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
import {
  getDownloadURL,
  getMetadata,
  getStorage,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { IMetaLink } from "types/IMetaLink";
import { uuid } from "vue-uuid";

interface IGalaryCard {
  id?: string;
  source?: string;
  name?: string;
  description?: string;
  date?: number;
}

export const useGalaryStore = defineStore("galary-list", () => {
  const imageList = reactive({
    storeList: [] as string[],
    databaseList: [] as IGalaryCard[],
  });

  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "galary");

  const storage = getStorage();

  const listRef = ref(storage, "images/");

  /**
   * async Function Returns  getGalaryDBLimitList result
   * @return { Promise<void>} Promise  void
   *
   **/

  async function getGalaryDBLimitList(): Promise<void> {
    imageList.databaseList = [];
    const q = query(colRefs, orderBy("date", "desc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      imageList.databaseList.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  isImageExist result
   *  @param {string | undefined} imageMeta   string | undefined
   * @return { Promise<boolean>} Promise  boolean
   *
   **/
  async function isImageExist(imageMeta: string | undefined): Promise<boolean> {
    let isExist = false;
    if (imageMeta) {
      const forestRef = ref(storage, `images/${imageMeta}`);
      await getMetadata(forestRef)
        .then((meta) => {
          console.log("meta", meta);
          isExist = true;
        })
        .catch((error) => {
          console.log(error);
          isExist = false;
        });
    }

    return isExist;
  }

  /**
   * async Function Returns  getGalaryDBList result
   * @return { Promise<void>} Promise  boolean
   *
   **/
  async function getGalaryDBList(): Promise<void> {
    imageList.databaseList = [];

    const querySnapshot = await getDocs(colRefs);
    querySnapshot.forEach((doc) => {
      imageList.databaseList.push({ id: doc.id, ...doc.data() });
    });
  }

  /**
   * async Function Returns  getGalaryStoreList result
   * @return { Promise<void>} Promise  void
   *
   **/
  //List from Database
  async function getGalaryStoreList(): Promise<void> {
    await listAll(listRef).then((response) => {
      response.items.forEach(async (img) => {
        // console.log('Storage Ref', img);

        await getDownloadURL(img).then((url) => imageList.storeList.push(url));
      });
    });
  }
  /**
   * async Function Returns  uploadOnlyImage result
   *  @param {FileList} files   FileList
   * @return { Promise<IMetaLink>} Promise  IMetaLink
   *
   **/
  async function uploadOnlyImage(files: FileList): Promise<IMetaLink> {
    // console.log('uploadToStorage', files);

    const link = {
      url: "",
      metaName: "",
    };
    const imageRef = ref(storage, `images/${uuid.v4() + files[0].name}`);
    await uploadBytes(imageRef, files[0])
      .then(async (response) => {
        console.log("image Uploaded", response);
        await getDownloadURL(response.ref).then((url) => {
          link.url = url;
          link.metaName = response.metadata.name;
        });
      })
      .catch((err) => console.log(err));
    return link;
  }

  /**
   * async Function Returns  uploadOnlyAudio result
   *  @param {FileList} files   FileList
   * @return { Promise<IMetaLink>} Promise  IMetaLink
   *
   **/
  async function uploadOnlyAudio(files: FileList): Promise<IMetaLink> {
    // console.log('uploadToStorage', files);

    const link = {
      url: "",
      metaName: "",
    };
    const imageRef = ref(storage, `audio/${uuid.v4() + files[0].name}`);
    await uploadBytes(imageRef, files[0])
      .then(async (response) => {
        console.log("Audio Uploaded", response);
        await getDownloadURL(response.ref).then((url) => {
          link.url = url;
          link.metaName = response.metadata.name;
        });
      })
      .catch((err) => console.log(err));
    return link;
  }

  /**
   * async Function Returns  uploadToStorage result
   *  @param {FileList} files   FileList
   * @param {IGalaryCard} dataFORM   IGalaryCard
   * @return { Promise<boolean>} Promise  Object
   *
   **/
  //Uploading image to Image storage  and creating record into Galary table DB
  async function uploadToStorage(files: FileList, dataFORM: IGalaryCard): Promise<boolean> {
    // console.log('uploadToStorage', files);
    let isCreated = false;
    // upload image to image store
    const imageRef = ref(storage, `images/${uuid.v4() + files[0].name}`);
    await uploadBytes(imageRef, files[0])
      .then(async (response) => {
        // console.log('image Uploaded', response);
        // getting link
        await getDownloadURL(response.ref).then((url) => (dataFORM.source = url));
      })
      .catch((err) => console.log(err));

    // console.log('dataFORM', dataFORM);

    // create record in Galary table
    dataFORM?.source && (isCreated = await addToDatabase(dataFORM));

    //refresh list
    isCreated && (await getGalaryDBList());
    return isCreated;
  }

  /**
   * async Function Returns  addToDatabase result
   * @param {IGalaryCard} dataFORM   IGalaryCard
   * @return { Promise<boolean>} Promise  Object
   *
   **/
  //Add record to Database
  async function addToDatabase(dataFORM: IGalaryCard): Promise<boolean> {
    return await addDoc(colRefs, {
      source: dataFORM.source,
      name: dataFORM.name,
      description: dataFORM.description,
      date: (dataFORM.date = Date.now()),
    })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * async Function Returns  deleteItem result
   * @param {string} id   string
   * @return { Promise<void>} Promise  void
   *
   **/
  const deleteItem = async (id: string): Promise<void> => {
    await deleteDoc(doc(colRefs, id));
  };

  return {
    imageList,
    isImageExist,

    getGalaryDBList,
    getGalaryStoreList,
    uploadToStorage,
    getGalaryDBLimitList,
    uploadOnlyImage,
    uploadOnlyAudio,
    deleteItem,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGalaryStore, import.meta.hot));
}
