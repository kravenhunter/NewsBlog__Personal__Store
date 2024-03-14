<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

//Get  Authorized user
const { isAuthorized } = useAuthStore();

//Fetch AboutUs  data
const { aboutUs } = storeToRefs(useAboutUsStore());
const { getAboutUs } = useAboutUsStore();

//Fetch Contactsr links data
const { stateData } = storeToRefs(useContactStore());
const { getContacts } = useContactStore();

//Fetch Nav and Footer links data
const { navLinks, footerLinks } = storeToRefs(useNavStorage());
const { getList, getFooterList } = useNavStorage();

//Fetch Articles data
const { postsState } = storeToRefs(useArticleStore());
const { getPostList } = useArticleStore();

const { imageList } = storeToRefs(useGalaryStore());
const { getGalaryDBList } = useGalaryStore();
//CategoryLinks

const { categoryState } = storeToRefs(useCategoryStorage());
const { getGategoryList } = useCategoryStorage();

//Fetch Podcast List
const { podcastsState } = storeToRefs(usePodcastsStore());
const { getPodCastList } = usePodcastsStore();

//Fetch Advertisement List
const { advertiseList } = storeToRefs(useAdvertiseStore());
const { getAdvertiseList } = useAdvertiseStore();

const loadStores = async () => {
  if (!postsState.value.postList.length) {
    await getPostList();
  }
  if (!categoryState.value?.length) {
    await getGategoryList();
  }
  if (!podcastsState.value?.podcastList.length) {
    await getPodCastList();
  }
  if (!aboutUs.value) {
    await getAboutUs();
  }
  if (!stateData.value) {
    await getContacts();
  }
  if (!imageList.value.databaseList.length) {
    await getGalaryDBList();
  }
  if (!advertiseList.value.databaseList.length) {
    await getAdvertiseList();
  }

  if (!navLinks.value?.length) {
    await getList();
  }
  if (!footerLinks.value?.length) {
    await getFooterList();
  }
};
// async function loadStores2() {
//   await getPostList();
//   await getFooterList();
//   await getPodCastList();
//   await getList();
//   await getGategoryList();
//   await getGalaryDBList();
//   await getAdvertiseList();
//   await getAboutUs();
//   await getContacts();
// }
// await useAsyncData("loadData", loadStores2);

//Load all stores
await loadStores();

useSeoMeta({
  description: "the whole world daily news",
  ogDescription: "the whole world daily news",
});

onMounted(async () => {
  //check auth user in firebase
  await isAuthorized();
});
</script>

<template>
  <div class="defaultLayout">
    <header class="header_block">
      <UiAddTopHeader :category-links="navLinks" :top-links="footerLinks" />
      <UiAddHeaderMiddle />
      <UiAddHeader :nav-links="navLinks" />
    </header>

    <main class="body_block">
      <slot />
    </main>
    <footer class="footer_block">
      <UiAddFooter
        v-if="footerLinks"
        :contacts="stateData"
        :about-us-links="footerLinks"
        :favorites="postsState?.favoriteList"
        :categories="categoryState" />
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
