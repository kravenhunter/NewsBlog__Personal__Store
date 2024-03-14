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
import type { IComment } from "types/IComment";
import type { IError } from "types/IError";

export const useCommentsStore = defineStore("comments-list", () => {
  const commentsState = reactive({
    commentlist: [] as IComment[],
  });
  const errorStatus = ref<IError>({ statusCode: 0, message: "" });
  //Init Database Store
  initFirebaseApp();
  const firestoreDb = getFirestore();
  const colRefs = collection(firestoreDb, "comments");

  /**
   * async Function Returns  loadCommentsByPostId result
   *  @param {string | undefined} posyId   string | undefined}
   * @return { Promise<void>} Promise  IComment
   *
   **/
  const loadCommentsByPostId = async (postId: string | undefined): Promise<void> => {
    const list = [] as IComment[];
    const querySnapshot = await getDocs(colRefs);
    postId &&
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
    commentsState.commentlist = list.filter((el) => el.postId === postId);
  };
  /**
   * async Function Returns  addComment result
   *  @param {IComment} istated   state
   * @return { Promise<IError>}   IComment
   *
   **/
  const addComment = async (state: IComment): Promise<IError> => {
    const defaultAvatar =
      "https://firebasestorage.googleapis.com/v0/b/newsblog-bbdd6.appspot.com/o/avatars%2Fsponge-bob-profile-picture-thypix-124-680x700.jpg?alt=media&token=c270a0de-38d5-46bd-924a-83ec1458dd69";
    state.avatar = defaultAvatar;
    await addDoc(colRefs, {
      postId: state.postId,
      userId: state.userId,
      author: state.author,
      body: state.body,
      date: Date.now(),
      avatar: state.avatar,
    })
      .then((doc) => {
        console.log("Comment added");
        errorStatus.value.statusCode = 200;
        errorStatus.value.message = "Comment is added";
        commentsState.commentlist.unshift({ id: doc.id, ...state });
      })
      .catch(() => {
        console.log("Bad");
        errorStatus.value.statusCode = 405;
        errorStatus.value.message = "Bad result";
      });

    return errorStatus.value;
  };
  /**
   * async Function Returns  deleteComment result
   *  @param {string} id   state
   * @return { Promise<void>}   void
   *
   **/
  const deleteComment = async (id: string): Promise<void> => {
    await deleteDoc(doc(colRefs, id))
      .then(() => {
        commentsState.commentlist = commentsState.commentlist.filter((el) => el.id !== id);
      })
      .catch(() => console.log("error delet Comment"));
  };

  /**
   * async Function Returns  getCommenteById result
   *  @param {string} id   string
   * @return { Promise<IComment | undefined>} Promise   IComment | undefined
   *
   **/
  const getCommenteById = async (id: string): Promise<IComment | undefined> => {
    let getItem = commentsState.commentlist.find((el) => el.id === id);
    if (!getItem) {
      await getDoc(doc(colRefs, id)).then((doc) => {
        getItem = { id: doc.id, ...doc.data() };
      });
    }
    return getItem;
  };

  /**
   * async Function Returns  updateComment result
   *  @param {IComment} state   IComment
   * @return { Promise<void>}   Promise void
   *
   **/
  const updateComment = async (state: IComment): Promise<void> => {
    if (!state.id) {
      return;
    }
    const isExist = await getCommenteById(state.id);
    if (!isExist) {
      return;
    }
    await updateDoc(doc(colRefs, state.id), {
      postId: state.postId,
      userId: state.userId,
      author: state.author,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/newsblog-bbdd6.appspot.com/o/avatars%2Fsponge-bob-profile-picture-thypix-124-680x700.jpg?alt=media&token=c270a0de-38d5-46bd-924a-83ec1458dd69",

      body: state.body,
      date: Date.now(),
    });
  };
  return {
    commentsState,
    loadCommentsByPostId,
    addComment,
    deleteComment,
    updateComment,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommentsStore, import.meta.hot));
}
