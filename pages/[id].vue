<script setup lang="ts">
const route = useRoute();
const titlePath = ref("");
titlePath.value = route.path && convertPath(String(route.path));
function convertPath(path: string) {
  switch (path) {
    case "/":
      return "Main news";
    case "/aboutus":
      return "About Us";
    case "/advertise":
      return "Advertisement";
    case "/inthepress":
      return "In The Press";
    case "/writeforus":
      return "Write For Us";

    default:
      return "";
  }
}
// Check route params
const isRouteCorrect = (path: string) => {
  switch (path) {
    case "/":
      return true;
    case "/aboutus":
      return true;
    case "/advertise":
      return true;
    case "/inthepress":
      return true;
    case "/writeforus":
      return true;

    default:
      return false;
  }
};

//Throw  an error id route params are not  correct
if (!isRouteCorrect(route.path)) {
  throw createError({ statusCode: 404, statusMessage: `The Page not found` });
}
useSeoMeta({
  title: titlePath.value,
  ogTitle: titlePath.value,
});
</script>

<template>
  <section class="wrapper">
    <LazyInfoAboutUs v-if="route.path === '/aboutus'" />
    <LazyInfoAdvertise v-else-if="route.path === '/advertise'" />
    <LazyInfoInThePress v-else-if="route.path === '/inthepress'" />
    <LazyInfoWriteForUs v-else-if="route.path === '/writeforus'" />
  </section>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
}
</style>
