<script setup lang="ts">
import { storeToRefs } from "pinia";

const { podCastList, categoryList } = storeToRefs(useUnionStore());

const search = ref("");
const selected = ref("All");
const searchHandler = computed(() => {
  if (search.value) {
    return [...podCastList.value.filter((el) => el.title?.includes(search.value))].filter(
      (post) => post.category === selected.value,
    );
  } else {
    return podCastList.value.filter((post) => post.category === selected.value);
  }
});
// const searchHandler = () => {
//   if (search && selected.value !== "All") {
//     return [
//       ...podCastList.value.filter((el) => el.title?.includes(search.value)),
//     ].filter((post) => post.category === selected.value);
//   } else if (search && selected.value === "All") {
//     return [...podcastsState.value.podcastList.filter((el) => el.title?.includes(search.value))];
//   } else if (!search && selected.value !== "All") {
//     return [...podcastsState.value.podcastList.filter((post) => post.category === selected.value)];
//   }
// };
</script>

<template>
  <div class="posts_block grid_block">
    <div class="top grid_block">
      <div class="topic grid_block">
        <h1 class="title_category">PODCAST</h1>

        <h4 class="info">
          Read the latest news with the Best WordPress News Theme – Newspaper by Sergio Belov!
        </h4>

        <div class="aqualizer_container">
          <UiElementsMusicAqualizer
            v-if="podCastList.length"
            :list="podCastList"
            :show-list="true" />
        </div>
      </div>
      <div class="create_post">
        <UiElementsAddLink
          to-path="/guard/createpodcasts"
          :type-btn="false"
          color-bg="darkBlue"
          font-size="14px"
          paddings="0.6em 1.3em"
          >Create Podcast
        </UiElementsAddLink>
      </div>
    </div>
    <div class="main_section grid_block">
      <div class="form_block">
        <LazyUiElementsAddPostInput
          label="Search"
          width-form="100%"
          font-size="2rem"
          name="search"
          placeholder="Input search"
          v-model:value.trim="search" />
        <div class="select_block">
          <select v-model="selected">
            <option value="All">All</option>
            <option v-for="option in categoryList" :key="option.id" :value="option.title">
              {{ option.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="list">
        <GuardPodcastsList
          :label="selected"
          :list="searchHandler"
          direction-card="250px 2fr 0.5fr"
          row="250px"
          :show-body="true" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.baars {
  display: grid;
  grid-template-columns: repeat(4, auto);
  align-items: center;
  justify-content: center;
  column-gap: 50px;
}
.posts_block .form_block {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(200px, 800px);
  grid-template-rows: 30px;
  gap: 20px;
}
.posts_block .select_block {
  display: grid;
  grid-template-columns: 200px;
  gap: 20px;
}
.posts_block .select_block select {
  background-color: transparent;
  color: var(--color-dark);
  border: 1px solid var(--color-dark);
}
.grid_block {
  display: grid;
  justify-items: center;
}

.posts_block {
  row-gap: 30px;
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

  row-gap: 40px;
}
.posts_block .topic {
  row-gap: 30px;
}
.posts_block .top {
  row-gap: 20px;
}
</style>
