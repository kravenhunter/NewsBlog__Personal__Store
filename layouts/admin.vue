<script setup lang="ts">
// import { storeToRefs } from "pinia";

//Get  Authorized user
// const { isAuthorized } = useAuthStore();
// const { data, signOut, status } = useAuth();

const { loadDataList } = useUnionStore();
//Fetch AboutUs  data
// const {
//   postlist,
//   categoryList,
//   advertiseList,
//   aboutUs,
//   contactList,
//   navLiks,
//   footerLinks,
//   imageList,
//   podCastList,
//   userCredentials,
// } = storeToRefs(useUnionStore());

// const loadStores = async () => {
//   const postPropmis = loadDataList("post/list");
//   const tagPropmis = loadDataList("tag/list");
//   const audioPropmis = loadDataList("file/list-by-type/audio");
//   const contactsPropmis = loadDataList("contacts/list");
//   const aboutPropmis = loadDataList("about/list");
//   const imagePropmis = loadDataList("file/list-by-type/images");
//   const padvertisePropmis = loadDataList("advertise/list");
//   const navPropmis = loadDataList("nav-link/list");
//   const footerPropmis = loadDataList("footer-link/list");
//   const promiseAll = await Promise.allSettled([
//     postPropmis,
//     tagPropmis,
//     audioPropmis,
//     contactsPropmis,
//     aboutPropmis,
//     imagePropmis,
//     padvertisePropmis,
//     navPropmis,
//     footerPropmis,
//   ]);
// };

// const article = await loadDataList("article/list");
const article = loadDataList("post/list");
const categoryList = loadDataList("tag/list");
const contacts = loadDataList("contacts/list");
const about = loadDataList("about/list");
const images = loadDataList("file/list-by-type/images");
const advertise = loadDataList("advertise/list");
const nav = loadDataList("nav-link/list");
const footer = loadDataList("footer-link/list");
const user = loadDataList("user-credentials/list");
const audio = loadDataList("file/list-by-type/audio");

// const loadStores = async () => {
//   if (!categoryList.value?.length) {
//     const result = await loadDataList("tag/list");
//     console.log(result);
//   }

//   if (!contactList.value.length) {
//     const result = await loadDataList("contacts/list");
//     console.log(result);
//   }
//   if (!aboutUs.value.length) {
//     const result = await loadDataList("about/list");
//     console.log(result);
//   }

//   if (!imageList.value.length) {
//     const result = await loadDataList("file/list-by-type/images");
//     console.log(result);
//   }
//   if (!advertiseList.value.length) {
//     const result = await loadDataList("advertise/list");
//     console.log(result);
//   }

//   if (!navLiks.value.length) {
//     const result = await loadDataList("nav-link/list");
//     console.log(result);
//   }
//   if (!footerLinks.value.length) {
//     const result = await loadDataList("footer-link/list");
//     console.log(result);
//   }
//   if (!userCredentials.value.length) {
//     const result = await loadDataList("user-credentials/list");
//     console.log(result);
//   }
//   if (!podCastList.value?.length) {
//     const result = await loadDataList("file/list-by-type/audio");
//     console.log(result);
//   }

//   // if (!postlist.value?.length) {
//   //   const result = await loadDataList("article/list");
//   //   console.log(result);
//   // }
// };
//Load all stores
// await loadStores();
// async function loadDataList(path: string) {
//   try {
//     const { data: response, error } = await useFetch<IResponse>(`api/${path}`);
//     if (error.value) {
//       throw error.value;
//     }
//     response.value?.table &&
//       response.value.statusCode === 200 &&
//       fillStoreData(response.value.table, response.value.objectResult);
//   } catch (error) {
//     console.log(error);
//   }
// }
//CHeck Auth a
onMounted(
  async () =>
    await Promise.allSettled([
      article,
      categoryList,
      contacts,
      about,
      images,
      advertise,
      nav,
      footer,
      user,
      audio,
    ]),
);
</script>

<template>
  <div class="admin_layout">
    <UiGuardAddSideBar />
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss">
.admin_layout {
  display: flex;
}
.admin_layout main {
  flex: 1 1 0;
  padding: 2rem;
}

@media (max-width: 768px) {
  .admin_layout main {
    padding-left: 6rem;
  }
}
</style>
