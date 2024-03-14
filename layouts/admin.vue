<script setup lang="ts">
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
/* 
const { geUsersList } = useUserStore();
const { authorizedUserCredentials } = storeToRefs(useUserStore()); */
/* 
const loadStores2 = async () => {
  !authorizedUserCredentials.value?.id && (await isAuthorized());

  await geUsersList();
  await getPostList();
  await getGategoryList();
  await getPodCastList();
  await getAboutUs();
  await getContacts();
  await getGalaryDBList();
  await getAdvertiseList();
  await getList();
  await getFooterList();
};
 */
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
//Load all stores
await loadStores();
//CHeck Auth a
onMounted(async () => await isAuthorized());
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
