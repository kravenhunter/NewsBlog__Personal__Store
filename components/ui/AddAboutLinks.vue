<script setup lang="ts">
import formatPath from "@/utils/formatPath";
import type { ICategory } from "types/ICategory";
import type { INavigation } from "types/INavigation";

defineProps({
  directionColumn: {
    type: String,
    default: "grid",
  },
  aboutlinks: {
    type: Array as PropType<INavigation[]>,
    default: () => [],
  },
  categorylinks: {
    type: Array as PropType<ICategory[]>,
    default: () => [],
  },
  gaps: {
    type: String,
    default: "10px",
  },
});
</script>

<template>
  <div class="about_container">
    <ul class="about_links" v-if="categorylinks.length">
      <li v-for="(link, i) in categorylinks" :key="i" :data-id="i">
        <NuxtLink :to="{ path: `/${link.title?.toLocaleLowerCase()}/list` }">
          {{ link?.title?.toLocaleUpperCase() }}
        </NuxtLink>
      </li>
    </ul>
    <ul class="about_links" v-if="aboutlinks.length">
      <li v-for="(link, i) in aboutlinks" :key="i" :data-id="i">
        <NuxtLink
          v-if="link.title === 'Events'"
          :to="{ path: `/${link.title?.toLocaleLowerCase()}/list` }">
          {{ link.title?.toLocaleUpperCase() }}
        </NuxtLink>
        <NuxtLink
          v-else
          :to="{ path: `/${link.title && formatPath(link.title?.toLocaleLowerCase())}` }">
          {{ link.title?.toLocaleUpperCase() }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/sizeMixin.scss";

.about_container .about_links {
  display: grid;
  gap: 10px;
}
.about_container a {
  color: var(--color-light);
  transition: 0.5s;
  transition-property: background-color color;
}

.about_container a:hover {
  color: #febe2b;
}
</style>
