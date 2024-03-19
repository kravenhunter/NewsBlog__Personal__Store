import { ref, useFetch } from "#imports";
import type {
  About,
  Advertise,
  Comment,
  Contacts,
  FooterLink,
  Navigation,
  Tag,
  User_Credentials,
} from "@prisma/client";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { IFileData, IPost } from "~/types";

// import { compressToBestSize } from "~/composables/compressFile";

//import { uuid } from "vue-uuid";
// import type {

//   IContacts,
//  } from "~/types";

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
  | "footer-link";

interface IResponse {
  statusCode: number;
  statusMessage: string;
}
const apiUrl = "/api";
export const useUnionStore = defineStore("union-store", () => {
  const postlist = ref<IPost[]>([]);
  const aboutUs = ref<About[] | null>();
  const advertiseList = ref<Advertise[] | null>();
  const contactList = ref<Contacts[] | null>();
  const categoryList = ref<Tag[] | null>();
  const commentListByCurrentPost = ref<Comment[] | null>();

  const imageList = ref<IFileData[] | null>();
  const podCastList = ref<IFileData[] | null>();

  const navLiks = ref<Navigation[] | null>();
  const footerLinks = ref<FooterLink[] | null>();
  const userCredentials = ref<User_Credentials[] | null>();

  const pendingData = ref<boolean>(false);
  const loadDataList = async <T>(apiPath: string, table: TypeTables) => {
    try {
      //  const temp = useFetch<Tag[]>(`/api/contacts/list`);
      const { data, error, refresh: refreshPost } = await useFetch<T[]>(`${apiUrl}/${apiPath}`);
      if (error.value) {
        throw error.value;
      }
      if (data.value) {
        switch (table) {
          case "post":
            postlist.value = data.value as IPost[];

            break;
          case "comment":
            commentListByCurrentPost.value = data.value as Comment[];
            break;
          case "images":
            imageList.value = data.value as IFileData[];
            break;
          case "podcasts":
            podCastList.value = data.value as IFileData[];
            break;
          case "about":
            aboutUs.value = data.value as About[];
            break;
          case "advertise":
            advertiseList.value = data.value as Advertise[];
            break;
          case "contacts":
            contactList.value = data.value as Contacts[];
            break;
          case "tag":
            categoryList.value = data.value as Tag[];
            break;
          case "nav-link":
            navLiks.value = data.value as Navigation[];
            break;
          case "footer-link":
            footerLinks.value = data.value as FooterLink[];
            break;

          default:
            break;
        }
      }
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
  const createOrUpdateData = async <T extends globalThis.Ref<Record<string, any> | BodyInit>>(
    apiPath: string,
    table: TypeTables,
    formData: T,
  ) => {
    try {
      const {
        data: response,
        error,
        refresh,
      } = await useFetch<IResponse>(apiPath, {
        method: "POST",
        body: formData,
      });
      console.log(response.value);

      if (error.value) {
        throw error.value;
      }

      return response.value;
    } catch (error) {}
  };
  const deleteDataById = async (apiPath: string) => {
    try {
      const { data: response, error } = await useFetch<IResponse>(apiPath);
      console.log(response.value);

      if (error.value) {
        throw error.value;
      }

      return response.value;
    } catch (error) {}
  };
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

  return {
    pendingData,
    postlist,
    aboutUs,
    advertiseList,
    contactList,
    categoryList,
    commentListByCurrentPost,
    imageList,
    podCastList,
    navLiks,
    footerLinks,
    createOrUpdateData,
    loadDataList,
    deleteDataById,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnionStore, import.meta.hot));
}
