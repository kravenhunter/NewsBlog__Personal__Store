<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IArticle } from "types/IArticle";

const search = ref("");
const articlesByCategory = ref<IArticle[]>();

const { categoryState } = storeToRefs(useCategoryStorage());

const { postsState } = storeToRefs(useArticleStore());

const selected = ref("All");

const searchResult = computed(() => {
  if (selected.value === "All" && !search.value) {
    articlesByCategory.value = [];
    articlesByCategory.value = [
      ...postsState.value.postList.filter((el) => el.title?.includes(search.value)),
    ];

    return articlesByCategory.value;
  } else if (selected.value !== "All") {
    articlesByCategory.value = [];
    articlesByCategory.value = [
      ...postsState.value.postList.filter((post) => post.category === selected.value),
    ];

    return articlesByCategory.value;
  } else {
    articlesByCategory.value = [];
    articlesByCategory.value = [
      ...postsState.value.postList.filter((el) => el.title?.includes(search.value)),
    ];

    return articlesByCategory.value;
  }
});
</script>

<template>
  <div class="posts_block grid_block">
    <div class="top grid_block">
      <div class="topic grid_block">
        <h1 class="title_category">ARTICLES</h1>

        <h4 class="info">
          Read the latest news with the Best WordPress News Theme – Newspaper by Sergio!
        </h4>
      </div>
      <div class="create_post">
        <UiElementsAddLink
          to-path="/guard/createpost"
          :type-btn="false"
          color-bg="darkBlue"
          font-size="14px"
          paddings="0.6em 1.3em"
          >Create Post
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
            <!--  <option disabled value="">All</option> -->
            <option value="All">All</option>
            <option v-for="option in categoryState" :key="option.id" :value="option.title">
              {{ option.title }}
            </option>
          </select>
        </div>
      </div>

      <div class="list">
        <GuardList
          :label="selected"
          :list="searchResult"
          direction-card="1fr 2fr 0.5fr"
          :show-short="true" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
  row-gap: 10px;
}
.posts_block .top {
  row-gap: 20px;
}
</style>
