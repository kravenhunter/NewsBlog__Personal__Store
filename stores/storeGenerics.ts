import { ref, useFetch } from "#imports";
import type { H3Error } from "h3";
import { acceptHMRUpdate, defineStore } from "pinia";
import type {
  IAbout,
  IAdvertisment,
  ICategory,
  IComment,
  IContacts,
  IFileData,
  INavigation,
  IPost,
  IResponse,
  IUserCredentials,
} from "~/types";

//import { uuid } from "vue-uuid";

type TypeTables =
  | "post"
  | "tag"
  | "images"
  | "podcasts"
  | "contacts"
  | "comment"
  | "about"
  | "advertise"
  | "nav-link"
  | "footer-link"
  | "user-credential";

const apiUrl = "/api";
export const useUnionStore = defineStore("union-store", () => {
  const postlist = ref<IPost[]>([]);
  const aboutUs = ref<IAbout[]>([]);
  const advertiseList = ref<IAdvertisment[]>([]);
  const contactList = ref<IContacts[]>([]);
  const categoryList = ref<ICategory[]>([]);
  const commentListByCurrentPost = ref<IComment[]>([]);
  const imageList = ref<IFileData[]>([]);
  const podCastList = ref<IFileData[]>([]);
  const navLiks = ref<INavigation[]>([]);
  const footerLinks = ref<INavigation[]>([]);
  const userCredentials = ref<IUserCredentials[]>([]);

  const pendingData = ref<boolean>(false);
  const isItemExist = (idItem: string, table: TypeTables) => {
    switch (table) {
      case "post":
        return postlist.value.some((el) => el.id === idItem);
      case "images":
        return imageList.value.some((el) => el.id === idItem);
      case "podcasts":
        return podCastList.value.some((el) => el.id === idItem);
      case "about":
        return aboutUs.value.some((el) => el.id === idItem);
      case "advertise":
        return advertiseList.value.some((el) => el.id === idItem);
      case "contacts":
        return contactList.value.some((el) => el.id === idItem);
      case "tag":
        return categoryList.value.some((el) => el.id === idItem);
      case "nav-link":
        return navLiks.value.some((el) => el.id === idItem);
      case "footer-link":
        return footerLinks.value.some((el) => el.id === idItem);
      case "user-credential":
        return userCredentials.value.some((el) => el.id === idItem);
    }
  };
  const fillStoreData = <T>(table: string, data: T, action?: string) => {
    switch (table) {
      case "post":
        action === "create" && postlist.value.push(data as IPost);
        action === "update" &&
          (postlist.value = postlist.value.map((el) => {
            if (el.id === (data as IPost).id) {
              return data as IPost;
            }
            return el;
          }));
        action === "delete" &&
          (postlist.value = postlist.value.filter((el) => el.id !== (data as IPost).id));
        !action && (postlist.value = data as IPost[]);

        break;
      case "comment":
        if (action === "create") {
          const newComment = data as IComment;

          const getPost = postlist.value.find((post) => post.id === newComment.postId);

          getPost && getPost.Comment?.push(newComment);
        }

        // action === "update" &&
        //   (commentListByCurrentPost.value = commentListByCurrentPost.value.map((el) => {
        //     if (el.id === (data as IComment).id) {
        //       return data as IComment;
        //     }
        //     return el;
        //   }));
        action === "delete" &&
          (commentListByCurrentPost.value = commentListByCurrentPost.value.filter(
            (el) => el.id !== (data as IComment).id,
          ));

        break;
      case "images":
        action === "create" && imageList.value.push(data as IFileData);
        action === "update" &&
          (imageList.value = imageList.value.map((el) => {
            if (el.id === (data as IFileData).id) {
              return data as IFileData;
            }
            return el;
          }));
        action === "delete" &&
          (imageList.value = imageList.value.filter((el) => el.id !== (data as IFileData).id));
        !action && (imageList.value = data as IFileData[]);

        break;
      case "podcasts":
        action === "create" && podCastList.value.push(data as IFileData);
        action === "update" &&
          (podCastList.value = podCastList.value.map((el) => {
            if (el.id === (data as IFileData).id) {
              return data as IFileData;
            }
            return el;
          }));
        action === "delete" &&
          (podCastList.value = podCastList.value.filter((el) => el.id !== (data as IFileData).id));
        !action && (podCastList.value = data as IFileData[]);

        break;
      case "about":
        action === "create" && aboutUs.value.push(data as IAbout);
        action === "update" &&
          (aboutUs.value = aboutUs.value.map((el) => {
            if (el.id === (data as IAbout).id) {
              return data as IAbout;
            }
            return el;
          }));
        action === "delete" &&
          (aboutUs.value = aboutUs.value.filter((el) => el.id !== (data as IAbout).id));
        !action && (aboutUs.value = data as IAbout[]);

        break;
      case "advertise":
        action === "create" && advertiseList.value.push(data as IAdvertisment);
        action === "update" &&
          (advertiseList.value = advertiseList.value.map((el) => {
            if (el.id === (data as IAdvertisment).id) {
              return data as IAdvertisment;
            }
            return el;
          }));
        action === "delete" &&
          (advertiseList.value = advertiseList.value.filter(
            (el) => el.id !== (data as IAdvertisment).id,
          ));
        !action && (advertiseList.value = data as IAdvertisment[]);

        break;
      case "file":
        action === "create" && imageList.value.push(data as IFileData);
        action === "update" &&
          (imageList.value = imageList.value.map((el) => {
            if (el.id === (data as IFileData).id) {
              return data as IFileData;
            }
            return el;
          }));
        action === "delete" &&
          (imageList.value = imageList.value.filter((el) => el.id !== (data as IFileData).id));
        !action && (imageList.value = data as IFileData[]);

        break;
      case "contacts":
        action === "create" && contactList.value.push(data as IContacts);
        action === "update" &&
          (contactList.value = contactList.value.map((el) => {
            if (el.id === (data as IContacts).id) {
              return data as IContacts;
            }
            return el;
          }));
        action === "delete" &&
          (contactList.value = contactList.value.filter((el) => el.id !== (data as IContacts).id));
        !action && (contactList.value = data as IContacts[]);

        break;
      case "tag":
        action === "create" && categoryList.value.push(data as ICategory);
        action === "update" &&
          (categoryList.value = categoryList.value.map((el) => {
            if (el.id === (data as ICategory).id) {
              return data as ICategory;
            }
            return el;
          }));
        action === "delete" &&
          (categoryList.value = categoryList.value.filter(
            (el) => el.id !== (data as ICategory).id,
          ));
        !action && (categoryList.value = data as ICategory[]);
        break;
      case "nav-link":
        action === "create" && navLiks.value.push(data as INavigation);
        action === "update" &&
          (navLiks.value = navLiks.value.map((el) => {
            if (el.id === (data as INavigation).id) {
              return data as INavigation;
            }
            return el;
          }));
        action === "delete" &&
          (navLiks.value = navLiks.value.filter((el) => el.id !== (data as INavigation).id));
        !action && (navLiks.value = data as INavigation[]);

        break;
      case "footer-link":
        action === "create" && footerLinks.value.push(data as INavigation);
        action === "update" &&
          (footerLinks.value = footerLinks.value.map((el) => {
            if (el.id === (data as INavigation).id) {
              return data as INavigation;
            }
            return el;
          }));
        action === "delete" &&
          (footerLinks.value = footerLinks.value.filter(
            (el) => el.id !== (data as INavigation).id,
          ));
        !action && (footerLinks.value = data as INavigation[]);
        break;

      case "user-credential":
        action === "create" && userCredentials.value.push(data as IUserCredentials);
        action === "update" &&
          (userCredentials.value = userCredentials.value.map((el) => {
            if (el.id === (data as IUserCredentials).id) {
              return data as IUserCredentials;
            }
            return el;
          }));
        action === "delete" &&
          (userCredentials.value = userCredentials.value.filter(
            (el) => el.id !== (data as IUserCredentials).id,
          ));
        !action && (userCredentials.value = data as IUserCredentials[]);

        break;

      default:
        break;
    }

    // console.log(categoryList.value);
  };
  /**
   * async Function Returns void
   * @param {string} apiPath   apiPath
   * @param {TypeTables} table   table
   * @return {Promise<void>}  Promise void.
   *
   **/
  const loadDataList = async (apiPath: string) => {
    try {
      // const { data: response2 } = await useFetch<IResponse>(`/api/article/list`);
      const { data: response, error, refresh } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`);
      if (error.value) {
        throw error.value;
      }

      if (!response.value) {
        return {
          statusCode: 400,
          statusMessage: "Response object is null",
        };
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult);

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      const getError = error as H3Error;
      return {
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      };
    }
  };

  /**
   * async Function Pass Data to Create  in Data base and  Returns IResponse
   * @param {string} apiPath   apiPath
   * @param {T} formData   form data type T
   * @return {Promise<IResponse>}  Promise IResponse {statusCode , statusMessage}
   *
   **/
  const createOrUpdateData = async <T extends Record<string, any>>(
    apiPath: string,
    formData: T,
  ): Promise<IResponse> => {
    try {
      const {
        data: response,
        error,
        refresh,
      } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`, {
        method: "POST",
        body: formData,
      });

      if (error.value) {
        throw error.value;
      }
      if (!response.value) {
        throw createError({
          statusCode: 401,
          statusMessage: "Response object is null",
        });
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult, response.value.method);

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      const getError = error as H3Error;
      return {
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      };
    }
  };

  /**
   * async Function Returns  void
   * @param {string} apiPath   apiPath
   * @return { Promise<void>}  Promise void
   *
   **/
  const deleteDataById = async (apiPath: string) => {
    try {
      const { data: response, error } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`);

      if (error.value) {
        throw error.value;
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult, "delete");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * async Function Returns voidt
   * @param {string} postId   postId
   * @return {Promise<void>}  Promise void.
   *
   **/
  const getCommentsByPostId = async (postId: string) => {
    try {
      const {
        data,
        error,
        refresh: refreshPost,
      } = await useFetch<IComment[]>(`${apiUrl}/comment/list-by-post-id/list/${postId}`);
      if (error.value) {
        throw error.value;
      }
      data.value && (commentListByCurrentPost.value = data.value);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * async Function Returns   IPost array
   * @param {string} category   category
   * @return {Promise<IPost[]>}  Promise Post[].
   *
   **/
  const getPostByCategory = (category: string) => {
    return postlist.value.filter((el) => {
      return el.tags.some((el) => el.title?.includes(category));
    });
  };

  /**
   * async Function Returns  IPost array
   * @param {string} search   search
   * @return {Promise<IPost[]>}  Promise Post[].
   *
   **/
  const getPostByName = (search: string) => postlist.value.filter((el) => el.title.match(search));

  /**
   * async Function Returns  IPost object
   * @param {string} search   search
   * @return {Promise<IPost>}  Promise Post.
   *
   **/
  const getPostById = (postId: string) => postlist.value.find((el) => el.id === postId);

  /**
   * async Function Returns  IResponse object | null
   * @param {string} apiPath   apiPath
   * @param {T} formData   formData
   * @return {Promise<IResponse | null>}  Promise IResponse | null.
   *
   **/

  /**
   * async Function Returns IUserCredentials | undefined
   * @param {string} name   apiPath
   * @return { IUserCredentials | undefined}  IUserCredentials | undefined
   *
   **/
  const getAuthUserByName = (name?: string) =>
    userCredentials.value?.find((u) => u.userNameField === name);

  /**
   * async Function Returns boolean
   * @param {string} id   apiPath
   * @return {boolean}  boolean
   *
   **/
  const isPostExist = (id: string): boolean => postlist.value.some((el) => el.id === id);

  return {
    isItemExist,
    getPostById,
    fillStoreData,
    pendingData,
    postlist,
    aboutUs,
    advertiseList,
    contactList,
    categoryList,
    commentListByCurrentPost,
    userCredentials,
    imageList,
    podCastList,
    navLiks,
    footerLinks,
    isPostExist,
    getPostByName,
    createOrUpdateData,
    getCommentsByPostId,
    loadDataList,
    deleteDataById,
    getPostByCategory,
    getAuthUserByName,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnionStore, import.meta.hot));
}
