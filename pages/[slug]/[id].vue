<script setup lang="ts">
import { storeToRefs } from "pinia";

//Get Route params
const route = useRoute();
const routeSlug = String(route.params.slug);
const routeId = String(route.params.id);

//Fetch Articles data
const { postlist } = storeToRefs(useUnionStore());

// Check route params
const isRouteCorrect = () => {
  if (routeSlug === "search") {
    return true;
  } else if (routeId && (routeId === "list" || postlist.value.some((el) => el.id === routeId))) {
    return true;
  }

  return false;
};

// //Throw  an error id route params are not  correct
if (!isRouteCorrect()) {
  throw createError({ statusCode: 404, statusMessage: `The Page not found` });
}
</script>

<template>
  <section class="wrapper">
    <ArticleListBlock v-if="route.params.slug === 'search' || (routeId && routeId === 'list')" />
    <ArticleSingleBlock v-else-if="routeId && postlist.some((el) => el.id === routeId)" />
  </section>
</template>
