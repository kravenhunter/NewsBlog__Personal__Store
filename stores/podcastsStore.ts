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
import type { IPodcast } from "types/IPodcast";

export const usePodcastsStore = defineStore("podcast-store", () => {
  const podcastsState = reactive({
    podcastList: [] as IPodcast[],
    styleList: [] as IPodcast[],
    policyList: [] as IPodcast[],
    businessList: [] as IPodcast[],
    artList: [] as IPodcast[],
    culture: [] as IPodcast[],
    favoriteList: [] as IPodcast[],
    worldList: [] as IPodcast[],
  });

  const searchList = ref<IPodcast[]>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });
  //Init Database Store
  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "podcasts");

  // Init Image Store
  const galaryStore = useGalaryStore();
  const { uploadOnlyAudio, uploadOnlyImage } = galaryStore;

  /**
   * async Function Returns  getPodCastList result
   * @return { Promise<void>} Promise  IError
   *
   **/
  async function getPodCastList() {
    podcastsState.podcastList = [];
    const q = query(colRefs, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      podcastsState.podcastList.push({ id: doc.id, ...doc.data() });
      // console.log(`${doc.id} =>`, doc);
    });
    podcastsState.favoriteList = podcastsState.podcastList.filter(
      (el) => el.category === "Favorite",
    );
    podcastsState.styleList = podcastsState.podcastList.filter((el) => el.category === "Style");
    podcastsState.policyList = podcastsState.podcastList.filter((el) => el.category === "Politics");
    podcastsState.businessList = podcastsState.podcastList.filter(
      (el) => el.category === "Business",
    );
    podcastsState.artList = podcastsState.podcastList.filter((el) => el.category === "Art");
    podcastsState.culture = podcastsState.podcastList.filter((el) => el.category === "Culture");
    podcastsState.worldList = podcastsState.podcastList.filter((el) => el.category === "World");
  }

  /**
   * async Function Returns  addNewItem result
   * @param { FileList, FileList , IPodcast} imageFile m audioFile, state    FileList, FileList , IPodcast
   * @return { Promise<IError>} Promise  IError
   *
   **/

  const addPodcast = async (imageFile: FileList, audioFile: FileList, state: IPodcast) => {
    const getImageLink = await uploadOnlyImage(imageFile);
    const getAudioLink = await uploadOnlyAudio(audioFile);
    getImageLink &&
      getAudioLink &&
      (await addDoc(colRefs, {
        title: state.title,
        author: state.author,
        userName: state.userName,
        category: state.category,
        imageLink: getImageLink.url,
        imageMeta: getImageLink.metaName,
        audioLink: getAudioLink.url,
        audioMeta: getAudioLink.metaName,
        description: state.description,
        date: (state.date = Date.now()),
      })
        .then(() => {
          console.log("Added");
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "Podcast is added";
        })
        .catch(() => {
          console.log("Error addimg Podcast");
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        }));

    return errorStatus.value;
  };

  /**
   * async Function Returns  updatePodcast result
   * @param { FileList, FileList , IPodcast} imageFile m audioFile, state    FileList, FileList , IPodcast
   * @return { Promise<void>} Promise  void
   *
   **/
  const updatePodcast = async (imageFile: FileList, audioFile: FileList, state: IPodcast) => {
    if (!imageFile.length && !audioFile.length) {
      await updateDoc(doc(colRefs, state.id), {
        title: state.title,
        author: state.author,
        userName: state.userName,
        category: state.category,
        imageLink: state.imageLink,
        imageMeta: state.imageMeta,
        audioLink: state.audioLink,
        audioMeta: state.audioMeta,
        description: state.description,
        date: (state.date = Date.now()),
      });
    } else if (imageFile.length && audioFile.length) {
      const getImageLink = await uploadOnlyImage(imageFile);
      const getAudioLink = await uploadOnlyAudio(audioFile);
      await updateDoc(doc(colRefs, state.id), {
        title: state.title,
        author: state.author,
        userName: state.userName,
        category: state.category,
        imageLink: getImageLink.url,
        imageMeta: getImageLink.metaName,
        audioLink: getAudioLink.url,
        audioMeta: getAudioLink.metaName,
        description: state.description,
        date: (state.date = Date.now()),
      });
    }
  };

  /**
   * async Function Returns  getPodcastByCategory result
   * @param { stringt} category  , string
   * @return {IPodcast[]} IPodcast
   *
   **/
  const getPodcastByCategory = (category: string) => {
    const getCategoryList = podcastsState.podcastList.filter(
      (el) => el.category?.toLocaleLowerCase() === category.toLocaleLowerCase(),
    );

    return getCategoryList;
  };

  /**
   * async Function Returns  getPodcastById result
   * @param { string} id  string
   * @return {  IPodcast | undefined }    IPodcast | undefined
   *
   **/
  const getPodcastById = (id: string): IPodcast | undefined => {
    const getItem = podcastsState.podcastList.find((el) => el.id === id);

    return getItem;
  };

  /**
   * async Function Returns  deletePodcast result
   * @param { string | undefined} id  string | undefined
   * @return { Promise<void>}   Promise void
   *
   **/
  const deletePodcast = async (id: string | undefined): Promise<void> => {
    id &&
      (await deleteDoc(doc(colRefs, id))
        .then(() => {
          podcastsState.podcastList = podcastsState.podcastList.filter((el) => el.id !== id);
        })
        .catch(() => console.log("error delet Podcast")));

    // await deleteDoc(doc(collection($firestoreDb as Firestore, 'posts'), id));
  };

  /**
   * async Function Returns  getPodcastById result
   * @return { Promise<void>}   Promise void
   *
   **/
  const sortByDate = async (): Promise<void> => {
    // const q = query(
    //   collection($firestoreDb as Firestore, 'posts'),
    //   orderBy('author', 'asc'),
    //   limit(3),
    // );
    const q = query(colRefs, orderBy("author", "asc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      podcastsState.podcastList.push({ id: doc.id, ...doc.data() });
    });
  };
  return {
    podcastsState,
    searchList,
    getPodCastList,
    addPodcast,
    getPodcastByCategory,
    getPodcastById,

    deletePodcast,

    sortByDate,
    updatePodcast,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePodcastsStore, import.meta.hot));
}
