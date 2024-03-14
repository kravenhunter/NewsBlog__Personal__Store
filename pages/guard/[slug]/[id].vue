<script setup lang="ts">
import type { IArticle } from "types/IArticle";

const route = useRoute();
const currentPost = ref<IArticle>();

const articleStore = useArticleStore();
const { getArticleById } = articleStore;

route.params.slug === "post" &&
  route.params.id &&
  (currentPost.value = getArticleById(String(route.params.id)));

definePageMeta({
  layout: "admin",
  /*   middleware: ["auth"], */
});
</script>

<template>
  <div class="main_container">
    <LazyGuardPostsEditPost v-if="route.params.slug === 'edit' && route.params.id" />
    <div class="content_data" v-if="route.params.slug === 'post' && currentPost">
      <LazyArticleSingleArticle
        class-type="image_content_middle"
        :single-post="currentPost"
        font-size="35px"
        :show-title="true"
        :show-category="true"
        :show-image="true"
        :show-date="true"
        :show-content="true" />
      <!--   <div class="editor_content" v-html="currentPost.body"></div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main_container {
  display: grid;
  grid-template-columns: repeat(1, minmax(auto, 900px));
  justify-content: space-around;
  row-gap: 20px;
}
</style>
