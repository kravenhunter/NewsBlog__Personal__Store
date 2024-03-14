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
import type { IArticle } from "types/IArticle";
import type { IError } from "types/IError";

export const useArticleStore = defineStore("article-list", () => {
  const postsState = reactive({
    postList: [] as IArticle[],
    styleList: [] as IArticle[],
    policyList: [] as IArticle[],
    businessList: [] as IArticle[],
    artList: [] as IArticle[],
    culture: [] as IArticle[],
    favoriteList: [] as IArticle[],
    worldList: [] as IArticle[],
  });
  initFirebaseApp();
  const searchList = ref<IArticle[] | undefined>();
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });
  //Init Database Store
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "posts");

  // Init Image Store
  const galaryStore = useGalaryStore();
  const { uploadOnlyImage } = galaryStore;
  const cleanSTates = () => {
    postsState.postList = [];
    postsState.favoriteList = [];
    postsState.styleList = [];
    postsState.policyList = [];
    postsState.businessList = [];
    postsState.artList = [];
    postsState.culture = [];
    postsState.worldList = [];
  };

  /**
   * async Function Returns  getPostList
   * @return {Promise<void>}  Promise void
   **/
  async function getPostList() {
    cleanSTates();
    const q = query(colRefs, orderBy("date", "desc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postsState.postList.push({ id: doc.id, ...doc.data() });
    });
    postsState.favoriteList = postsState.postList.filter((el) => el.category === "Favorite");
    postsState.styleList = postsState.postList.filter((el) => el.category === "Style");
    postsState.policyList = postsState.postList.filter((el) => el.category === "Politics");
    postsState.businessList = postsState.postList.filter((el) => el.category === "Business");
    postsState.artList = postsState.postList.filter((el) => el.category === "Art");
    postsState.culture = postsState.postList.filter((el) => el.category === "Culture");
    postsState.worldList = postsState.postList.filter((el) => el.category === "World");
    // console.log("articleStore getPostList", postsState.postList);
  }

  /**
   * async Function Returns  refectData
   * @return {Promise<void>}  Promise void
   **/
  const refectData = async () => {
    if (errorStatus.value.statusCode === 200) {
      await getPostList();
      // await new Promise((resolve) => setTimeout(() => resolve, 1000));
    }
  };

  /**
   * async Function Returns  addPost result
   * @param {FileList} filList   FileList
   *  @param {IArticle} state   IArticle
   * @return {Promise<IError>}  Promise IError
   *
   **/
  const addPost = async (filList: FileList, state: IArticle): Promise<IError> => {
    const getLink = await uploadOnlyImage(filList);

    getLink &&
      (await addDoc(colRefs, {
        title: state.title,
        author: state.author,
        category: state.category,
        image: getLink.url,
        imageMeta: getLink.metaName,
        shortBody: state.shortBody,
        body: state.body,
        date: (state.date = Date.now()),
      })
        .then(() => {
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "Article is added";
        })
        .catch(() => {
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        }));

    //do delay for refreshing data
    await refectData();

    return errorStatus.value;
  };

  /**
   * async Function Returns  updatePost result
   * @param {FileList | undefined} filList   FileList | undefined
   *  @param {IArticle} state   IArticle
   * @return {Promise<IError>}  Promise IError
   *
   **/
  const updatePost = async (filList: FileList | undefined, state: IArticle): Promise<IError> => {
    if (!filList) {
      console.log(state);
      await updateDoc(doc(colRefs, state.id), {
        title: state.title,
        author: state.author,
        category: state.category,
        imageMeta: state.imageMeta,
        image: state.image,
        shortBody: state.shortBody,
        body: state.body,
        date: (state.date = Date.now()),
      })
        .then(() => {
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "Article is updated";
        })
        .catch(() => {
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        });
    } else {
      // console.log("else update");
      const getLink = await uploadOnlyImage(filList);
      await updateDoc(doc(colRefs, state.id), {
        title: state.title,
        author: state.author,
        category: state.category,
        image: getLink.url,
        imageMeta: getLink.metaName,
        shortBody: state.shortBody,
        body: state.body,
        date: (state.date = Date.now()),
      })
        .then(() => {
          // console.log("Aticle Updated");
          errorStatus.value.statusCode = 200;
          errorStatus.value.message = "Article is added";
        })
        .catch(() => {
          // console.log("Error update  article");
          errorStatus.value.statusCode = 405;
          errorStatus.value.message = "Bad result";
        });
    }
    //do delay for refreshing data
    await refectData();
    return errorStatus.value;
  };

  /**
   * async Function Returns  getArticlesByCategory result
   *  @param {string} category   string
   * @return {IArticle[]}  IArticle[]
   *
   **/
  const getArticlesByCategory = (category: string) => {
    const getCategoryList = postsState.postList.filter(
      (el) => el.category?.toLocaleLowerCase() === category.toLocaleLowerCase(),
    );

    return getCategoryList;
  };

  /**
   * async Function Returns  findArticlesByName result
   *  @param {string} search   string
   * @return {IArticle[]}  IArticle[]
   *
   **/
  const findArticlesByName = (search: string) => {
    const getSearchResult = postsState.postList.filter((el) => el.title?.includes(search));
    return getSearchResult;
  };

  /**
   * async Function Returns  getArticleById result
   *  @param {string} id   string
   * @return {IArticle}  IArticle
   *
   **/
  const getArticleById = (id: string) => {
    const getItem = postsState.postList.find((el) => el.id === id);

    return getItem;
  };

  /**
   * async Function Returns  deletePost result
   *  @param {string} id   string
   * @return { Promise<void>}   Promise<void>
   *
   **/
  const deletePost = async (id: string) => {
    await deleteDoc(doc(colRefs, id))
      .then(() => {
        postsState.postList = postsState.postList.filter((el) => el.id !== id);
      })
      .catch(() => console.log("error delet Article"));

    // await deleteDoc(doc(collection($firestoreDb as Firestore, 'posts'), id));
  };

  /**
   * async Function Returns  sortByDate
   * @return { Promise<void>}   Promise<void>
   *
   **/
  const sortByDate = async () => {
    // const q = query(
    //   collection($firestoreDb as Firestore, 'posts'),
    //   orderBy('author', 'asc'),
    //   limit(3),
    // );
    const q = query(colRefs, orderBy("author", "asc"), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      postsState.postList.push({ id: doc.id, ...doc.data() });
    });
  };

  /**
   * async Function Returns  isExistPost
   *  @param {string} id   state
   * @return {boolean}  boolean
   *
   **/
  const isExistPost = (id: string) => postsState.postList.some((el) => el.id === id);

  return {
    postsState,
    searchList,

    findArticlesByName,
    getPostList,
    getArticlesByCategory,
    getArticleById,
    addPost,
    deletePost,
    isExistPost,
    sortByDate,
    updatePost,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useArticleStore, import.meta.hot));
}
