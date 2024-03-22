<script setup lang="ts">
import { storeToRefs } from "pinia";

//Get  Authorized user
// const { isAuthorized } = useAuthStore();
// const { data, signOut, status } = useAuth();

const { loadDataList, fillStoreData } = useUnionStore();
//Fetch AboutUs  data
const {
  postlist,
  categoryList,
  advertiseList,
  aboutUs,
  contactList,
  navLiks,
  footerLinks,
  imageList,
  podCastList,
} = storeToRefs(useUnionStore());

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
const loadStores = async () => {
  if (!postlist.value?.length) {
    await loadDataList("post/list");
  }
  if (!categoryList.value?.length) {
    await loadDataList("tag/list");
  }
  if (!podCastList.value?.length) {
    await loadDataList("file/list-by-type/audio");
  }
  if (!contactList.value.length) {
    await loadDataList("contacts/list");
  }
  if (!aboutUs.value.length) {
    await loadDataList("about/list");
  }

  if (!imageList.value.length) {
    await loadDataList("file/list-by-type/images");
  }
  if (!advertiseList.value.length) {
    await loadDataList("advertise/list");
  }

  if (!navLiks.value.length) {
    await loadDataList("nav-link/list");
  }
  if (!footerLinks.value.length) {
    await loadDataList("footer-link/list");
  }
};
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
onMounted(async () => await loadStores());
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
