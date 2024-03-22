<script setup lang="ts">
import type { INavigation } from "~/types";

interface IProps {
  navLinks?: INavigation[] | null;
}

defineProps<IProps>();

const selectedTab = ref("");

function clickOnTab(path: string | undefined) {
  path && (selectedTab.value = path);
}
</script>

<template>
  <header class="header">
    <ul class="header_list">
      <li>
        <NuxtLink
          :to="{ path: `/` }"
          :class="{ active: selectedTab === '/' }"
          class="link"
          @click="clickOnTab('/')"
          >News</NuxtLink
        >
      </li>
      <li v-for="(link, i) in navLinks" :key="i" :data-id="i">
        <NuxtLink
          :to="{ path: `/${link?.title?.toLocaleLowerCase()}/list` }"
          :class="{ active: selectedTab === link.title }"
          class="link"
          @click="clickOnTab(link.title)"
          >{{ link.title }}</NuxtLink
        >
      </li>
    </ul>
  </header>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/sizeMixin.scss";

.header {
  display: grid;
  grid-auto-rows: auto;
  // height: 56px;
  padding: 20px 0;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
}
.header_list {
  display: flex;
  // column-gap: var(--size-20);
  // column-gap: 1vmax;
  column-gap: 20px;
  @media (max-width: 1200px) {
    @include adaptive("column-gap", 20, 10, 0);
  }
  @media (max-width: 798px) {
    column-gap: 0;
  }
  @media (max-width: 700px) {
    display: none;
  }
}

.header_list .link {
  // font-size: 0.9vmax;
  font-weight: 700;
  padding: 20px;
  transition: 0.7s;
  transition-property: background-color color;
  @media (max-width: 1200px) {
    padding: 10px 10px;
    // @include adaptive('font-size', 16, 12, 1);
  }
}
.active {
  background-color: var(--color-dark);
  color: aliceblue;
}
.header_list .link:hover {
  background-color: var(--color-dark);
  color: aliceblue;
}
</style>
