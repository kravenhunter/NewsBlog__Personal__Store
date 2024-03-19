<script setup lang="ts">
import type {
  About,
  Advertise,
  Contacts,
  File as FileData,
  FooterLink,
  Navigation,
  Post,
  Tag,
} from "@prisma/client";
import { storeToRefs } from "pinia";

//Get  Authorized user
// const { isAuthorized } = useAuthStore();
// const { data, signOut, status } = useAuth();

const { loadDataList } = useUnionStore();
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

const loadStores = async () => {
  if (!postlist.value?.length) {
    await loadDataList<Post[]>("/api/post/list", "post");
  }
  if (!categoryList.value?.length) {
    await loadDataList<Tag[]>("/api/tag/list", "tag");
  }
  if (!podCastList.value?.length) {
    await loadDataList<FileData[]>("/api/file/list-by-type/audio", "podcasts");
  }
  if (!contactList.value) {
    await loadDataList<Contacts[]>("/api/contacts/list", "contacts");
  }
  if (!aboutUs.value) {
    await loadDataList<About[]>("/api/about/list", "about");
  }

  if (!imageList.value) {
    await loadDataList<FileData[]>("/api/file/list-by-type/images", "images");
  }
  if (!advertiseList.value) {
    await loadDataList<Advertise[]>("/api/advertise/list", "advertise");
  }

  if (!navLiks.value) {
    await loadDataList<Navigation[]>("/api/nav-link/list", "nav-link");
  }
  if (!footerLinks.value) {
    await loadDataList<FooterLink[]>("/api/footer-link/list", "footer-link");
  }
};
//Load all stores
await loadStores();

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
