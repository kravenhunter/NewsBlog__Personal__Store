import { ref, useFetch } from "#imports";

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

// import { compressToBestSize } from "~/composables/compressFile";

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
  //const temp = useFetch("/api/advertise/create");
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
        console.log(categoryList.value);
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
      console.log(apiPath);

      const { data: response, error, refresh } = await useFetch<IResponse>(`${apiUrl}/${apiPath}`);
      if (error.value) {
        throw error.value;
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult);
    } catch (error) {
      console.log(error);
    }
  };

  const createOrUpdateData = async <T extends Record<string, any>>(
    apiPath: string,
    formData: T,
  ) => {
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
        throw new Error("The instance isn't created");
      }

      response.value?.table &&
        response.value.statusCode === 200 &&
        fillStoreData(response.value.table, response.value.objectResult, response.value.method);

      return {
        statusCode: response.value.statusCode,
        statusMessage: response.value.statusMessage,
      };
    } catch (error) {
      console.log(error);
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
      // userCredentials.value = userCredentials.value?.filter(u => u.id !== )
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
  const getSizeImage = async (fileImage: File): Promise<number> => {
    return await new Promise((resolve) => {
      const newImage = new Image();
      //Create Blob Link
      newImage.src = URL.createObjectURL(fileImage);
      newImage.onload = function () {
        console.log(`${newImage.width} x ${newImage.height}`);
        resolve(newImage.width);
      };
    });
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

  // async function loadImageToStore(
  //   fileCover: File,
  //   typeImage: TypeImage,
  //   imageWidth: number,
  // ): Promise<string> {
  //   const urlImage = `https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/${typeImage}/`;

  //   const linkDefault = "image";
  //   try {
  //     const compressedFile = await compressToBestSize(imageWidth, fileCover);

  //     if (compressedFile?.compressedFILE) {
  //       console.log(compressedFile.compressedFILE);
  //       const imageName = `${uuid.v4()}_${typeImage}_${compressedFile?.compressedFILE.name}`;

  //       const { data: imagePath, error: errorCover } = await supabaseStore.storage
  //         .from(`images/${typeImage}`)
  //         .upload(imageName, compressedFile.compressedFILE);

  //       if (errorCover) {
  //         throw errorCover;
  //       }

  //       const newImageSource = urlImage + imagePath.path;
  //       return newImageSource;
  //     } else {
  //       throw new Error(`The compression  Fails`);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return linkDefault;
  //   }
  // }
  //const createOrUpdateData = async <T extends Record<string, any> | BodyInit>

  /**
   * async Function Returns  IResponse object | null
   * @param {string} apiPath   apiPath
   * @param {T} formData   formData
   * @return {Promise<IResponse | null>}  Promise IResponse | null.
   *
   **/

  // const createData2 = async <T extends TypeInterfaces>(
  //   fileDataCover: File,
  //   fileDataPreview: File,
  //   content: T,
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  // ): Promise<string> => {
  //   const getUrls = `${apiUrl}/${table}/${methodRequest}`;

  //   try {
  //     const getCoverWidth = await getSizeImage(fileDataCover);
  //     const coverPromise = loadImageToStore(fileDataCover, "cover", getCoverWidth);
  //     const previewPromise = loadImageToStore(fileDataPreview, "preview", 600);
  //     const promiseAll = await Promise.all([coverPromise, previewPromise]);

  //     content.imageBgLink = promiseAll[0];
  //     content.imagePreviewLink = promiseAll[1];
  //     console.log(content);

  //     const { data: response, error } = await useFetch<TypeModels>(getUrls, {
  //       method: "post",
  //       body: JSON.stringify(content),
  //     });
  //     console.log(response.value);

  //     if (error.value) {
  //       throw error.value;
  //     }

  //     // switch (table) {
  //     //   case "post":
  //     //     refreshPost();
  //     //     break;
  //     //   case "specie":
  //     //     refreshSpecie();
  //     //     break;
  //     //   case "main-content-pages":
  //     //     refreshMainPages();
  //     //     break;
  //     //   case "contacts":
  //     //     refreshContactUs();
  //     //     break;
  //     //   case "membership":
  //     //     refreshMembershipPrice();
  //     //     break;
  //     //   case "ticket":
  //     //     refreshTicketPrice();
  //     //     break;
  //     // }

  //     return "Success";
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     console.log("CreateData complete");
  //   }

  //   return "Error";
  // };

  // const updateData = async <T extends TypeInterfaces>(
  //   idData: string,
  //   fileDataCover: 0 | File | undefined,
  //   fileDataPreview: 0 | File | undefined,
  //   content: T,
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  // ) => {
  //   if (idData) {
  //     const getUrls = `${apiUrl}/${table}/${methodRequest}/${idData}`;
  //     try {
  //       if (fileDataCover) {
  //         const getCoverWidth = await getSizeImage(fileDataCover);
  //         console.log(getCoverWidth);

  //         content.imageBgLink = await loadImageToStore(fileDataCover, "cover", getCoverWidth);
  //         console.log(content.imageBgLink);
  //       }

  //       fileDataPreview &&
  //         (content.imagePreviewLink = await loadImageToStore(fileDataPreview, "preview", 600));
  //       console.log(content);
  //       const { data: response, error } = await useFetch<TypeModels>(getUrls, {
  //         method: "post",
  //         body: JSON.stringify(content),
  //       });

  //       if (error.value) {
  //         throw error.value;
  //       }
  //       // switch (table) {
  //       //   case "post":
  //       //     refreshPost();
  //       //     break;
  //       //   case "specie":
  //       //     refreshSpecie();
  //       //     break;
  //       //   case "main-content-pages":
  //       //     refreshMainPages();
  //       //     break;
  //       //   case "contacts":
  //       //     refreshContactUs();
  //       //     break;
  //       //   case "membership":
  //       //     refreshMembershipPrice();
  //       //     break;
  //       //   case "ticket":
  //       //     refreshTicketPrice();
  //       //     break;
  //       // }

  //       return "Success";
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   return "Error";
  // };
  // const createPlanData = async <TypeIntefacesPrice>(
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  //   firstPricesTable: TypeIntefacesPrice,
  //   secondPricesTable: TypeIntefacesPrice,
  //   thirdPricesTable: TypeIntefacesPrice,
  // ): Promise<string> => {
  //   const getUrls = `${apiUrl}/${table}/${methodRequest}`;

  //   try {
  //     const { data: response, error } = await useFetch<TypeModelsPrice[]>(getUrls, {
  //       method: "post",
  //       body: JSON.stringify({
  //         first: firstPricesTable,
  //         second: secondPricesTable,
  //         third: thirdPricesTable,
  //       }),
  //     });

  //     console.log(response.value);

  //     if (error.value) {
  //       throw error.value;
  //     }

  //     return "Success";
  //   } catch (error) {
  //     console.log(error);
  //     return "Error";
  //   }
  // };
  // const updatePlanPrices = async (
  //   idFirst: string,
  //   idSecond: string,
  //   idThird: string,
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  //   firstPricesTable: TypeModelsPrice,
  //   secondPricesTable: TypeModelsPrice,
  //   thirdPricesTable: TypeModelsPrice,
  // ) => {
  //   if (idFirst && idSecond) {
  //     const getUrlsFirst = `${apiUrl}/${table}/${methodRequest}/${idFirst}`;
  //     const getUrlsSecond = `${apiUrl}/${table}/${methodRequest}/${idSecond}`;
  //     const getUrlsThird = `${apiUrl}/${table}/${methodRequest}/${idThird}`;
  //     try {
  //       const firstResult = useFetch<TypeModelsPrice>(getUrlsFirst, {
  //         method: "post",
  //         body: JSON.stringify(firstPricesTable),
  //       });

  //       const secondResult = useFetch<TypeModelsPrice>(getUrlsSecond, {
  //         method: "post",
  //         body: JSON.stringify(secondPricesTable),
  //       });
  //       const thirdResult = useFetch<TypeModelsPrice>(getUrlsThird, {
  //         method: "post",
  //         body: JSON.stringify(thirdPricesTable),
  //       });
  //       const promiseAll = await Promise.all([firstResult, secondResult, thirdResult]);

  //       const { data: responseFirst, error: errorFirst } = promiseAll[0];
  //       const { data: responseSecond, error: errorSecond } = promiseAll[1];
  //       const { data: responseThird, error: erroThird } = promiseAll[2];

  //       if (errorFirst.value && errorSecond.value && erroThird.value) {
  //         throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
  //       } else if (errorFirst.value) {
  //         throw errorFirst.value;
  //       } else if (errorSecond.value) {
  //         throw errorSecond.value;
  //       } else if (erroThird.value) {
  //         throw errorSecond.value;
  //       }
  //       console.log(responseFirst.value);
  //       console.log(responseSecond.value);
  //       console.log(responseThird.value);
  //       // switch (table) {
  //       //   case "membership":
  //       //     refreshMembershipPrice();
  //       //     break;
  //       //   case "ticket":
  //       //     refreshTicketPrice();
  //       //     break;
  //       // }

  //       return "Success";
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   return "Error";
  // };
  // const createTablesData = async <TypeIntefacesPrice>(
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  //   firstPricesTable: TypeIntefacesPrice,
  //   secondPricesTable: TypeIntefacesPrice,
  // ): Promise<string> => {
  //   const getUrls = `${apiUrl}/${table}/${methodRequest}`;

  //   try {
  //     const firstResult = useFetch<TypeModelsPrice>(getUrls, {
  //       method: "post",
  //       body: JSON.stringify(firstPricesTable),
  //     });

  //     const secondResult = useFetch<TypeModelsPrice>(getUrls, {
  //       method: "post",
  //       body: JSON.stringify(secondPricesTable),
  //     });
  //     const promiseAll = await Promise.all([firstResult, secondResult]);
  //     const { data: responseFirst, error: errorFirst } = promiseAll[0];
  //     const { data: responseSecond, error: errorSecond } = promiseAll[1];

  //     if (errorFirst.value && errorSecond.value) {
  //       throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
  //     } else if (errorFirst.value) {
  //       throw errorFirst.value;
  //     } else if (errorSecond.value) {
  //       throw errorSecond.value;
  //     }

  //     // switch (table) {
  //     //   case "membership":
  //     //     refreshMembershipPrice();
  //     //     break;
  //     //   case "ticket":
  //     //     refreshTicketPrice();
  //     //     break;
  //     // }

  //     return "Success";
  //   } catch (error) {
  //     console.log(error);
  //     return "Error";
  //   }
  // };
  // const updateDataPrices = async <TypeIntefacesPrice>(
  //   idFirst: string,
  //   idSecond: string,
  //   table: TypeTables,
  //   methodRequest: ReqiestMethod,
  //   firstPricesTable: TypeIntefacesPrice,
  //   secondPricesTable: TypeIntefacesPrice,
  // ) => {
  //   if (idFirst && idSecond) {
  //     const getUrlsFirst = `${apiUrl}/${table}/${methodRequest}/${idFirst}`;
  //     const getUrlsSecond = `${apiUrl}/${table}/${methodRequest}/${idSecond}`;

  //     try {
  //       const firstResult = useFetch<TypeModelsPrice>(getUrlsFirst, {
  //         method: "post",
  //         body: JSON.stringify(firstPricesTable),
  //       });

  //       const secondResult = useFetch<TypeModelsPrice>(getUrlsSecond, {
  //         method: "post",
  //         body: JSON.stringify(secondPricesTable),
  //       });
  //       const promiseAll = await Promise.all([firstResult, secondResult]);
  //       const { data: responseFirst, error: errorFirst } = promiseAll[0];
  //       const { data: responseSecond, error: errorSecond } = promiseAll[1];

  //       if (errorFirst.value && errorSecond.value) {
  //         throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
  //       } else if (errorFirst.value) {
  //         throw errorFirst.value;
  //       } else if (errorSecond.value) {
  //         throw errorSecond.value;
  //       }

  //       // switch (table) {
  //       //   case "membership":
  //       //     refreshMembershipPrice();
  //       //     break;
  //       //   case "ticket":
  //       //     refreshTicketPrice();
  //       //     break;
  //       // }

  //       return "Success";
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   return "Error";
  // };
  // const getDataByTitle = (title: string, table: TypeTables): TypeModels[] | undefined => {
  //   switch (table) {
  //     case "post":
  //       return postlist.value?.filter((el) => el.title === title);
  //     case "specie":
  //       return specieList.value?.filter((el) => el.title === title);
  //     case "main-content-pages":
  //       return mainPages.value?.filter((el) => el.title === title);
  //     case "contacts":
  //       return contactPage.value?.filter((el) => el.title === title);
  //   }
  // };
  // const getDataById = (
  //   idData: string,
  //   table: TypeTables,
  // ): TypeModels | TypeModelsPrice | undefined => {
  //   switch (table) {
  //     case "post":
  //       return postlist.value?.find((el) => el.id === idData);
  //     case "specie":
  //       return specieList.value?.find((el) => el.id === idData);
  //     case "main-content-pages":
  //       return mainPages.value?.find((el) => el.id === idData);
  //     case "contacts":
  //       return contactPage.value?.find((el) => el.id === idData);
  //     case "membership":
  //       return membershipTable.value?.find((el) => el.id === idData);
  //     case "ticket":
  //       return ticketTable.value?.find((el) => el.id === idData);
  //   }
  // };

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
  const isPostExist = (id: string) => postlist.value.some((el) => el.id === id);
  return {
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
