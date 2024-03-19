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

//CHeck Auth a
// onMounted(async () => await isAuthorized());
definePageMeta({
  layout: "admin",
  middleware: "auth", //from nuxt-config
});
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
