<script setup lang="ts">
import { storeToRefs } from "pinia";

const { loadDataList } = useUnionStore();
//Fetch AboutUs  data
const { postlist, categoryList, contactList, navLiks, footerLinks } = storeToRefs(useUnionStore());

// const loadStores = async () => {
//   if (!postlist.value?.length) {
//     await loadDataList("post/list");
//   }
//   if (!categoryList.value?.length) {
//     const res = await loadDataList("tag/list");
//     console.log(res);
//     console.log(categoryList.value);
//   }
//   if (!podCastList.value?.length) {
//     await loadDataList("file/list-by-type/audio");
//   }
//   if (!contactList.value) {
//     await loadDataList("contacts/list");
//   }
//   if (!aboutUs.value) {
//     await loadDataList("about/list");
//   }

//   if (!imageList.value) {
//     await loadDataList("file/list-by-type/images");
//   }
//   if (!advertiseList.value) {
//     await loadDataList("advertise/list");
//   }

//   if (!navLiks.value) {
//     await loadDataList("nav-link/list");
//   }
//   if (!footerLinks.value) {
//     await loadDataList("footer-link/list");
//   }
// };

// //Load all stores
// await loadStores();
const articlePromise = loadDataList("post/list");
const categoryListPromise = loadDataList("tag/list");
const contactsPromise = loadDataList("contacts/list");
const aboutPromise = loadDataList("about/list");
const imagesPromise = loadDataList("file/list-by-type/images");
const advertisePromise = loadDataList("advertise/list");
const navPromise = loadDataList("nav-link/list");
const footerPromise = loadDataList("footer-link/list");
const userPromise = loadDataList("user-credentials/list");
const audioPromise = loadDataList("file/list-by-type/audio");

await Promise.allSettled([
  articlePromise,
  categoryListPromise,
  contactsPromise,
  aboutPromise,
  imagesPromise,
  advertisePromise,
  navPromise,
  footerPromise,
  userPromise,
  audioPromise,
]);
useSeoMeta({
  description: "the whole world daily news",
  ogDescription: "the whole world daily news",
});

// onMounted(async () => {
//   //check auth user in firebase
//   await isAuthorized();
// });
</script>

<template>
  <div class="defaultLayout">
    <header class="header_block">
      <UiAddTopHeader :category-links="navLiks" :top-links="footerLinks" />
      <UiAddHeaderMiddle />
      <UiAddHeader :nav-links="navLiks" />
    </header>

    <main class="body_block">
      <slot />
    </main>
    <footer class="footer_block">
      <UiAddFooter
        v-if="footerLinks"
        :contacts="contactList"
        :about-us-links="footerLinks"
        :favorites="postlist?.slice(0, 2)"
        :categories="categoryList" />
    </footer>
  </div>
</template>

<style scoped>
.defaultLayout {
  min-height: 155vh;

  display: grid;
  grid-template-columns: repeat(1, minmax(auto, 1920px));
  justify-content: center;
  grid-template-rows:
    [header] auto
    [body] 1fr
    [footer] auto;
}
.defaultLayout .header_block {
  grid-row: header;
}
.defaultLayout .body_block {
  grid-row: body;

  /*  height: 100vh; */
}

.defaultLayout .footer_block {
  grid-row: footer;
}
</style>
