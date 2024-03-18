import { ref, useFetch } from "#imports";
import { compressToBestSize } from "@/composables/compressFile";
import { useImageStorage } from "@/composables/states";
import type {
  AboutUs,
  ContactUs,
  ContentPages,
  MembershipPrice,
  PlanPrice,
  Post,
  Specie,
  TicketPrice,
} from "@prisma/client";
import { acceptHMRUpdate, defineStore } from "pinia";
import type {
  IContacts,
  IContentPage,
  IMembershipPrice,
  IPlan,
  IPost,
  ISpecie,
  ITicketPrice,
} from "types/ITypes";
import { uuid } from "vue-uuid";

type ReqiestMethod =
  | "list"
  | "update"
  | "create"
  | "delete-by-id"
  | "create-ticket-prices"
  | "create-member-prices"
  | "update-member-prices"
  | "update-ticket-prices";

type TypeInterfaces = IPost | IContentPage | ISpecie | IContacts;
type TypeModels = Post | ContentPages | Specie | ContactUs | AboutUs;
type TypeIntefacesPrice = ITicketPrice | IMembershipPrice | IPlan;
type TypeModelsPrice = TicketPrice | MembershipPrice | PlanPrice;
type TypeTables =
  | "plan"
  | "post"
  | "specie"
  | "main-content-pages"
  | "contacts"
  | "membership"
  | "ticket";
type TypeImage = "cover" | "preview";
const apiUrl = "/api/prisma";
export const useUnionStore = defineStore("union-store", () => {
  const postlist = ref<Post[] | null>();
  const specieList = ref<Specie[] | null>();
  const mainPages = ref<ContentPages[] | null>();
  const contactPage = ref<ContactUs[] | null>();
  const membershipTable = ref<MembershipPrice[] | null>();
  const ticketTable = ref<TicketPrice[] | null>();
  const planTable = ref<PlanPrice[] | null>();

  const pendingData = ref<boolean>(false);
  const loadDataList = async () => {
    try {
      const postPromise = useFetch<Post[]>(`${apiUrl}/post/list`);
      const speciePromise = useFetch<Specie[]>(`${apiUrl}/specie/list`);
      const mainPagesPromise = useFetch<ContentPages[]>(`${apiUrl}/main-content-pages/list`);
      const contactsPromise = useFetch<ContactUs[]>(`${apiUrl}/contacts/list`);
      const memberPromise = useFetch<MembershipPrice[]>(`${apiUrl}/membership/list`);
      const ticketPromise = useFetch<TicketPrice[]>(`${apiUrl}/ticket/list`);
      const planPromise = useFetch<PlanPrice[]>(`${apiUrl}/plan/list`);
      const promiseAll = await Promise.all([
        postPromise,
        speciePromise,
        mainPagesPromise,
        contactsPromise,
        memberPromise,
        ticketPromise,
        planPromise,
      ]);

      const { data: postResult, error: errorPost, refresh: refreshPost } = promiseAll[0];
      const { data: specieResult, error: errorSpecie, refresh: refreshSpecie } = promiseAll[1];
      const {
        data: mainPagesResult,
        error: errorMainPages,
        refresh: refreshMainPages,
      } = promiseAll[2];
      const {
        data: contactPageResult,
        error: errorContactUs,
        refresh: refreshContactUs,
      } = promiseAll[3];
      const {
        data: membershipTableResult,
        error: errorMembershipPrice,
        refresh: refreshMembershipPrice,
      } = promiseAll[4];
      const {
        data: ticketTableResult,
        error: errorTicketPrice,
        refresh: refreshTicketPrice,
      } = promiseAll[5];
      const {
        data: planTableResult,
        error: errorPlanPrice,
        refresh: refreshPlanPrice,
      } = promiseAll[6];
      if (
        errorPost.value ||
        errorSpecie.value ||
        errorMainPages.value ||
        errorContactUs.value ||
        errorMembershipPrice.value ||
        errorTicketPrice.value ||
        errorPlanPrice.value
      ) {
        throw errorPost.value;
      }
      if (errorSpecie.value) {
        throw errorSpecie.value;
      }
      if (errorMainPages.value) {
        throw errorMainPages.value;
      }
      if (errorContactUs.value) {
        throw errorContactUs.value;
      }
      if (errorMembershipPrice.value) {
        throw errorMembershipPrice.value;
      }
      if (errorTicketPrice.value) {
        throw errorTicketPrice.value;
      }
      if (errorPlanPrice.value) {
        throw errorPlanPrice.value;
      }

      postlist.value = postResult.value;
      specieList.value = specieResult.value;
      mainPages.value = mainPagesResult.value;
      contactPage.value = contactPageResult.value;
      membershipTable.value = membershipTableResult.value;
      ticketTable.value = ticketTableResult.value;
      planTable.value = planTableResult.value;
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
  async function loadImageToStore(
    fileCover: File,
    typeImage: TypeImage,
    imageWidth: number,
  ): Promise<string> {
    const supabaseStore = useImageStorage();

    const urlImage = `https://epjfkkmrnhyxzevpvbjf.supabase.co/storage/v1/object/public/images/${typeImage}/`;

    const linkDefault = "image";
    try {
      const compressedFile = await compressToBestSize(imageWidth, fileCover);

      if (compressedFile?.compressedFILE) {
        console.log(compressedFile.compressedFILE);
        const imageName = `${uuid.v4()}_${typeImage}_${compressedFile?.compressedFILE.name}`;

        const { data: imagePath, error: errorCover } = await supabaseStore.storage
          .from(`images/${typeImage}`)
          .upload(imageName, compressedFile.compressedFILE);

        if (errorCover) {
          throw errorCover;
        }

        const newImageSource = urlImage + imagePath.path;
        return newImageSource;
      } else {
        throw new Error(`The compression  Fails`);
      }
    } catch (error) {
      console.log(error);
      return linkDefault;
    }
  }

  const createData = async <T extends TypeInterfaces>(
    fileDataCover: File,
    fileDataPreview: File,
    content: T,
    table: TypeTables,
    methodRequest: ReqiestMethod,
  ): Promise<string> => {
    const getUrls = `${apiUrl}/${table}/${methodRequest}`;

    try {
      const getCoverWidth = await getSizeImage(fileDataCover);
      const coverPromise = loadImageToStore(fileDataCover, "cover", getCoverWidth);
      const previewPromise = loadImageToStore(fileDataPreview, "preview", 600);
      const promiseAll = await Promise.all([coverPromise, previewPromise]);

      content.imageBgLink = promiseAll[0];
      content.imagePreviewLink = promiseAll[1];
      console.log(content);

      const { data: response, error } = await useFetch<TypeModels>(getUrls, {
        method: "post",
        body: JSON.stringify(content),
      });
      console.log(response.value);

      if (error.value) {
        throw error.value;
      }

      // switch (table) {
      //   case "post":
      //     refreshPost();
      //     break;
      //   case "specie":
      //     refreshSpecie();
      //     break;
      //   case "main-content-pages":
      //     refreshMainPages();
      //     break;
      //   case "contacts":
      //     refreshContactUs();
      //     break;
      //   case "membership":
      //     refreshMembershipPrice();
      //     break;
      //   case "ticket":
      //     refreshTicketPrice();
      //     break;
      // }

      return "Success";
    } catch (error) {
      console.log(error);
    } finally {
      console.log("CreateData complete");
    }

    return "Error";
  };

  const updateData = async <T extends TypeInterfaces>(
    idData: string,
    fileDataCover: 0 | File | undefined,
    fileDataPreview: 0 | File | undefined,
    content: T,
    table: TypeTables,
    methodRequest: ReqiestMethod,
  ) => {
    if (idData) {
      const getUrls = `${apiUrl}/${table}/${methodRequest}/${idData}`;
      try {
        if (fileDataCover) {
          const getCoverWidth = await getSizeImage(fileDataCover);
          console.log(getCoverWidth);

          content.imageBgLink = await loadImageToStore(fileDataCover, "cover", getCoverWidth);
          console.log(content.imageBgLink);
        }

        fileDataPreview &&
          (content.imagePreviewLink = await loadImageToStore(fileDataPreview, "preview", 600));
        console.log(content);
        const { data: response, error } = await useFetch<TypeModels>(getUrls, {
          method: "post",
          body: JSON.stringify(content),
        });

        if (error.value) {
          throw error.value;
        }
        // switch (table) {
        //   case "post":
        //     refreshPost();
        //     break;
        //   case "specie":
        //     refreshSpecie();
        //     break;
        //   case "main-content-pages":
        //     refreshMainPages();
        //     break;
        //   case "contacts":
        //     refreshContactUs();
        //     break;
        //   case "membership":
        //     refreshMembershipPrice();
        //     break;
        //   case "ticket":
        //     refreshTicketPrice();
        //     break;
        // }

        return "Success";
      } catch (error) {
        console.log(error);
      }
    }
    return "Error";
  };
  const createPlanData = async <TypeIntefacesPrice>(
    table: TypeTables,
    methodRequest: ReqiestMethod,
    firstPricesTable: TypeIntefacesPrice,
    secondPricesTable: TypeIntefacesPrice,
    thirdPricesTable: TypeIntefacesPrice,
  ): Promise<string> => {
    const getUrls = `${apiUrl}/${table}/${methodRequest}`;

    try {
      const { data: response, error } = await useFetch<TypeModelsPrice[]>(getUrls, {
        method: "post",
        body: JSON.stringify({
          first: firstPricesTable,
          second: secondPricesTable,
          third: thirdPricesTable,
        }),
      });

      console.log(response.value);

      if (error.value) {
        throw error.value;
      }

      return "Success";
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };
  const updatePlanPrices = async (
    idFirst: string,
    idSecond: string,
    idThird: string,
    table: TypeTables,
    methodRequest: ReqiestMethod,
    firstPricesTable: TypeModelsPrice,
    secondPricesTable: TypeModelsPrice,
    thirdPricesTable: TypeModelsPrice,
  ) => {
    if (idFirst && idSecond) {
      const getUrlsFirst = `${apiUrl}/${table}/${methodRequest}/${idFirst}`;
      const getUrlsSecond = `${apiUrl}/${table}/${methodRequest}/${idSecond}`;
      const getUrlsThird = `${apiUrl}/${table}/${methodRequest}/${idThird}`;
      try {
        const firstResult = useFetch<TypeModelsPrice>(getUrlsFirst, {
          method: "post",
          body: JSON.stringify(firstPricesTable),
        });

        const secondResult = useFetch<TypeModelsPrice>(getUrlsSecond, {
          method: "post",
          body: JSON.stringify(secondPricesTable),
        });
        const thirdResult = useFetch<TypeModelsPrice>(getUrlsThird, {
          method: "post",
          body: JSON.stringify(thirdPricesTable),
        });
        const promiseAll = await Promise.all([firstResult, secondResult, thirdResult]);

        const { data: responseFirst, error: errorFirst } = promiseAll[0];
        const { data: responseSecond, error: errorSecond } = promiseAll[1];
        const { data: responseThird, error: erroThird } = promiseAll[2];

        if (errorFirst.value && errorSecond.value && erroThird.value) {
          throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
        } else if (errorFirst.value) {
          throw errorFirst.value;
        } else if (errorSecond.value) {
          throw errorSecond.value;
        } else if (erroThird.value) {
          throw errorSecond.value;
        }
        console.log(responseFirst.value);
        console.log(responseSecond.value);
        console.log(responseThird.value);
        // switch (table) {
        //   case "membership":
        //     refreshMembershipPrice();
        //     break;
        //   case "ticket":
        //     refreshTicketPrice();
        //     break;
        // }

        return "Success";
      } catch (error) {
        console.log(error);
      }
    }
    return "Error";
  };
  const createTablesData = async <TypeIntefacesPrice>(
    table: TypeTables,
    methodRequest: ReqiestMethod,
    firstPricesTable: TypeIntefacesPrice,
    secondPricesTable: TypeIntefacesPrice,
  ): Promise<string> => {
    const getUrls = `${apiUrl}/${table}/${methodRequest}`;

    try {
      const firstResult = useFetch<TypeModelsPrice>(getUrls, {
        method: "post",
        body: JSON.stringify(firstPricesTable),
      });

      const secondResult = useFetch<TypeModelsPrice>(getUrls, {
        method: "post",
        body: JSON.stringify(secondPricesTable),
      });
      const promiseAll = await Promise.all([firstResult, secondResult]);
      const { data: responseFirst, error: errorFirst } = promiseAll[0];
      const { data: responseSecond, error: errorSecond } = promiseAll[1];

      if (errorFirst.value && errorSecond.value) {
        throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
      } else if (errorFirst.value) {
        throw errorFirst.value;
      } else if (errorSecond.value) {
        throw errorSecond.value;
      }

      // switch (table) {
      //   case "membership":
      //     refreshMembershipPrice();
      //     break;
      //   case "ticket":
      //     refreshTicketPrice();
      //     break;
      // }

      return "Success";
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };
  const updateDataPrices = async <TypeIntefacesPrice>(
    idFirst: string,
    idSecond: string,
    table: TypeTables,
    methodRequest: ReqiestMethod,
    firstPricesTable: TypeIntefacesPrice,
    secondPricesTable: TypeIntefacesPrice,
  ) => {
    if (idFirst && idSecond) {
      const getUrlsFirst = `${apiUrl}/${table}/${methodRequest}/${idFirst}`;
      const getUrlsSecond = `${apiUrl}/${table}/${methodRequest}/${idSecond}`;

      try {
        const firstResult = useFetch<TypeModelsPrice>(getUrlsFirst, {
          method: "post",
          body: JSON.stringify(firstPricesTable),
        });

        const secondResult = useFetch<TypeModelsPrice>(getUrlsSecond, {
          method: "post",
          body: JSON.stringify(secondPricesTable),
        });
        const promiseAll = await Promise.all([firstResult, secondResult]);
        const { data: responseFirst, error: errorFirst } = promiseAll[0];
        const { data: responseSecond, error: errorSecond } = promiseAll[1];

        if (errorFirst.value && errorSecond.value) {
          throw new Error(`Error First: ${errorFirst.value}, Error Second: ${errorSecond.value}`);
        } else if (errorFirst.value) {
          throw errorFirst.value;
        } else if (errorSecond.value) {
          throw errorSecond.value;
        }

        // switch (table) {
        //   case "membership":
        //     refreshMembershipPrice();
        //     break;
        //   case "ticket":
        //     refreshTicketPrice();
        //     break;
        // }

        return "Success";
      } catch (error) {
        console.log(error);
      }
    }
    return "Error";
  };
  const getDataByTitle = (title: string, table: TypeTables): TypeModels[] | undefined => {
    switch (table) {
      case "post":
        return postlist.value?.filter((el) => el.title === title);
      case "specie":
        return specieList.value?.filter((el) => el.title === title);
      case "main-content-pages":
        return mainPages.value?.filter((el) => el.title === title);
      case "contacts":
        return contactPage.value?.filter((el) => el.title === title);
    }
  };
  const getDataById = (
    idData: string,
    table: TypeTables,
  ): TypeModels | TypeModelsPrice | undefined => {
    switch (table) {
      case "post":
        return postlist.value?.find((el) => el.id === idData);
      case "specie":
        return specieList.value?.find((el) => el.id === idData);
      case "main-content-pages":
        return mainPages.value?.find((el) => el.id === idData);
      case "contacts":
        return contactPage.value?.find((el) => el.id === idData);
      case "membership":
        return membershipTable.value?.find((el) => el.id === idData);
      case "ticket":
        return ticketTable.value?.find((el) => el.id === idData);
    }
  };

  const deleteDataById = async (
    idData: string,
    table: string,
    method: ReqiestMethod,
  ): Promise<string | null> => {
    const getUrls = `${apiUrl}/${table}/${method}/${idData}`;
    try {
      const { data: response, error } = await useFetch<string>(getUrls);

      if (error.value) {
        throw error.value;
      }
      // switch (table) {
      //   case "post":
      //     refreshPost();
      //     break;
      //   case "specie":
      //     refreshSpecie();
      //     break;
      //   case "main-content-pages":
      //     refreshMainPages();
      //     break;
      //   case "contacts":
      //     refreshContactUs();
      //     break;
      //   case "membership":
      //     refreshMembershipPrice();
      //     break;
      //   case "ticket":
      //     refreshTicketPrice();
      //     break;
      // }

      return response.value;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };

  return {
    pendingData,
    postlist,
    specieList,
    mainPages,
    contactPage,
    membershipTable,
    ticketTable,
    planTable,
    createPlanData,
    updatePlanPrices,
    loadDataList,
    getDataById,
    getDataByTitle,
    createData,
    updateData,
    createTablesData,
    updateDataPrices,
    deleteDataById,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUnionStore, import.meta.hot));
}
