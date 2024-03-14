<script setup lang="ts">
import { storeToRefs } from "pinia";

//Get Route params
const route = useRoute();
const routeSlug = String(route.params.slug);
const routeId = String(route.params.id);

//Fetch Articles data
const { postsState } = storeToRefs(useArticleStore());
const { isExistPost } = useArticleStore();
//Get Category data
const categoryStore = useCategoryStorage();
const { isExistCategory } = categoryStore;

// Check route params
const isRouteCorrect = () => {
  if (routeSlug === "search") {
    return true;
  } else if (routeId && (routeId === "list" || isExistPost(routeId))) {
    return true;
  }

  return false;
};

//Throw  an error id route params are not  correct
if (!isRouteCorrect()) {
  throw createError({ statusCode: 404, statusMessage: `The Page not found` });
}
</script>

<template>
  <section class="wrapper">
    <ArticleListBlock v-if="route.params.slug === 'search' || (routeId && routeId === 'list')" />
    <ArticleSingleBlock v-else-if="routeId && isExistPost(routeId)" />
  </section>
</template>
