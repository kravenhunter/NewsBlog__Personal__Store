<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import { storeToRefs } from "pinia";
import type { IArticle } from "types/IArticle";

const route = useRoute();
const articlesByCategory = ref<IArticle[]>([]);
const search = ref("");
const errorResponse = ref<NuxtError>();

//Meta variable
const titlePath = ref("");
titlePath.value = route.params.id && String(route.params.slug);
// Articles state
// const { postsState } = useArticleStore()
const { postsState } = storeToRefs(useArticleStore());
const { getArticlesByCategory, findArticlesByName } = useArticleStore();

// Advertisement galary state
const { advertiseList } = storeToRefs(useAdvertiseStore());

// CHeck route params
if (route.params.slug === "search") {
  search.value = String(route.params.id);
}

// Getting data by search request
const searchComputed = computed(() => {
  if (!search.value) {
    route.params.slug === "search" && (articlesByCategory.value = postsState.value.postList);
    route.params.id === "list" &&
      (articlesByCategory.value = getArticlesByCategory(String(route.params.slug)));
    // при SSR вызывало ошибку
    if (!articlesByCategory.value.length) {
      errorResponse.value = createError({ statusCode: 404, statusMessage: "Not found results" });
    }

    return articlesByCategory.value;
  } else {
    articlesByCategory.value = findArticlesByName(search.value);

    if (!articlesByCategory.value.length) {
      errorResponse.value = createError({ statusCode: 404, statusMessage: "Not found results" });
    }
    return articlesByCategory.value;
  }
});

useSeoMeta({
  title: `${titlePath.value.toLocaleUpperCase()}`,
  ogTitle: `${titlePath.value.toLocaleLowerCase()}`,
});
</script>

<template>
  <section class="list_container grid_block">
    <section class="top grid_block">
      <div class="advertise_block">
        <UiElementsAdvertise label="Advertisement" :link="advertiseList.databaseList[1]" />
      </div>

      <div class="topic grid_block">
        <h5 class="category">CATEGORY</h5>
        <h1 class="title_category">{{ String(route?.params?.slug)?.toLocaleUpperCase() }}</h1>

        <h4 class="info">
          Read the latest news with the Best WordPress News Theme – Newspaper by Sergio Belov!
        </h4>
      </div>
      <div class="form_block">
        <UiElementsAddPostInput
          label="Search"
          width-form="100%"
          font-size="2rem"
          name="search"
          placeholder="Input search"
          v-model:value.trim="search" />
      </div>
    </section>

    <section class="main_section">
      <section class="list grid_block" v-if="searchComputed.length">
        <div class="item" v-for="(el, i) in searchComputed" :key="i">
          <ArticleSingleArticle
            class-type="image_content_left"
            :show-image="true"
            :show-title="true"
            :show-short-body="true"
            :show-date="true"
            :single-post="el"
            :id="el?.id" />
        </div>
      </section>
      <section class="error_block" v-else>
        <ErrorResponse :error-event="errorResponse" />
      </section>
      <aside class="right_bar" v-if="postsState.postList.length">
        <h3>Latest News</h3>
        <ArticleSingleArticle
          class-type="image_content_rigth"
          :show-title="true"
          :show-image="true"
          :show-date="true"
          v-for="(el, i) in postsState.postList?.slice(4, 7)"
          :key="i"
          :single-post="el" />
      </aside>
    </section>
  </section>
</template>

<style scoped lang="scss">
.list_container .top .advertise_block {
  width: 1000px;
  @media (max-width: 1080px) {
    width: 100%;
  }
  @media (max-width: 700px) {
    display: none;
  }
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
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 30px;
  @media (max-width: 1300px) {
    grid-template-columns: 1fr;
    & .right_bar {
      display: none;
    }
  }
}

.grid_block {
  display: grid;
  justify-items: center;
}
.right_bar {
  display: grid;
  align-content: start;
  row-gap: 20px;
}
.list {
  row-gap: 30px;
}
.list_container .topic {
  row-gap: 10px;
}
.list_container .top {
  row-gap: 20px;
  & .form_block {
    width: 50vw;
    height: 40px;
    @media (max-width: 1080px) {
      width: 100%;
    }
  }
}
.list_container {
  padding: 0px 40px;

  row-gap: 30px;
}
</style>
