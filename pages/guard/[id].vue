<script setup lang="ts">
const route = useRoute();

definePageMeta({
  layout: "admin",
  middleware: "auth", //from nuxt-config
});
</script>

<template>
  <div class="list_container">
    <div class="grid_block center_block">
      <LazyGuardPostsBlock v-if="route.params.id === 'posts'" />
      <LazyGuardPostsAddPost v-if="route.params.id === 'createpost'" />
    </div>
    <LazyGuardPodcastsItem v-if="route.params.id === 'podcasts'" />
    <LazyGuardPodcastsCreateAudioRecord v-if="route.params.id === 'createpodcasts'" />
    <LazyGuardGalaryBlock v-if="route.params.id === 'galary'" />
    <LazyGuardCategoryBlock v-if="route.params.id === 'category'" />
    <LazyGuardAdvertiseBlock v-if="route.params.id === 'advertise'" />
    <LazyGuardAboutusItem v-if="route.params.id === 'aboutus'" />
    <LazyGuardNavigationBlock v-if="route.params.id === 'navigation'" />
    <LazyGuardContactsBlock v-if="route.params.id === 'contacts'" />
    <LazyGuardUsersProfilesBlock v-if="route.params.id === 'users'" />
    <LazyGuardSettingsBlock v-if="route.params.id === 'settings'" />
  </div>
</template>

<style scoped lang="scss">
.list_container {
  padding: 100px 40px 40px 40px;
  row-gap: 30px;
  width: 100%;
}
.grid_block {
  display: grid;
}
.center_block {
  justify-content: center;
}

.topic .title_category {
  font-size: 3rem;
  font-weight: 900;
}
.topic .info {
  font-family: var(--font-italic);
  font-weight: 500;
}
.main_section {
  grid-template-columns: 1000px;
}
.posts_block .topic {
  row-gap: 10px;
}
.posts_block .top {
  row-gap: 20px;
}
</style>
