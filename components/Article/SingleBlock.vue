<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IPost } from "~/types";

const route = useRoute();
const article = ref<IPost>();

const prevPage = ref<IPost>();
const nextPage = ref<IPost>();

//Gets  Comments list and functions

const { commentListByCurrentPost, postlist, advertiseList } = storeToRefs(useUnionStore());

const { getPostByCategory, getCommentsByPostId } = useUnionStore();

function getNavigations(currentPostId: string) {
  const categoryList = getPostByCategory(String(route.params.slug));

  const index = categoryList.findIndex((el) => el.id === currentPostId);
  prevPage.value = categoryList[index - 1];
  nextPage.value = categoryList[index + 1];
}
const loadStores = async () => {
  article.value = postlist.value.find((el) => el.id === String(route.params.id));
  article.value?.id && (await getCommentsByPostId(article.value.id));
  getNavigations(String(route.params.id));
};
loadStores();

// onMounted(() => console.log(commentsState.value.commentlist));

useSeoMeta({
  title: article.value && `${article.value?.title}`,
  ogTitle: article.value && `${article.value?.title}`,
});
</script>

<template>
  <div class="single_post_container" v-if="article">
    <div class="main">
      <ArticleSingleArticle
        class-type="image_content_middle"
        :single-post="article"
        font-size="35px"
        :show-title="true"
        :show-category="true"
        :show-image="true"
        :show-date="true" />

      <div class="content_block">
        <aside class="left_bar bars">
          <h3>Latest News</h3>
          <ArticleSingleArticle
            class-type="image_content_rigth"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            v-for="el in postlist.slice(4, 7)"
            :key="el.id"
            :single-post="el" />
        </aside>

        <article class="desctiprion">
          <ArticleSingleArticle
            class-type="image_content_middle"
            :single-post="article"
            :show-content="true" />
          <div class="nav_container">
            <ul class="nav_block">
              <li class="prev" v-if="prevPage">
                <p>Previous article</p>
                <NuxtLink :to="{ path: `/post/${prevPage.id}` }"
                  ><h4>{{ prevPage.title }}</h4></NuxtLink
                >
              </li>

              <li class="next" v-if="nextPage">
                <p>Next article</p>
                <NuxtLink :to="{ path: `/post/${nextPage.id}` }"
                  ><h4>{{ nextPage.title }}</h4></NuxtLink
                >
              </li>
            </ul>
          </div>
          <div class="comments grid_block">
            <LazyCommentsLeaveComments :post-id="article.id" />
            <div class="comment_block grid_block" v-if="commentListByCurrentPost?.length">
              <LazyCommentsCommentId
                v-for="com in commentListByCurrentPost"
                :key="com.id"
                :comment="com" />
            </div>
          </div>
        </article>
      </div>
    </div>

    <aside class="right_bar bars">
      <LazyUiElementsAdvertise
        v-if="advertiseList?.length"
        label="Advertisement"
        :link="advertiseList[1]" />
      <h3>Latest News</h3>
      <ArticleSingleArticle
        class-type="image_content_rigth"
        :show-title="true"
        :show-image="true"
        :show-date="true"
        v-for="el in postlist.slice(4, 7)"
        :key="el.id"
        :single-post="el" />
    </aside>
  </div>
</template>

<style scoped lang="scss">
.grid_block {
  display: grid;
  row-gap: 30px;
}
.nav_container .nav_block {
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 15px;
  justify-content: space-between;
  & p {
    font-size: 16px;
  }
  & .next {
    grid-column: 2;
  }
  & .next {
    grid-column: 2;
    max-width: 300px;
  }
  .prev {
    grid-column: 1;
    max-width: 300px;
  }
  @media (max-width: 900px) {
    font-size: 13px;
  }
  @media (max-width: 630px) {
    font-size: 12px;
  }
}

.single_post_container {
  display: grid;
  grid-template-columns: 2fr 0.6fr;
  column-gap: 50px;
  padding: 20px 100px;
  @media (max-width: 1400px) {
    column-gap: 20px;
  }
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
    padding: 20px 40px;
    & .right_bar {
      display: none;
    }
  }
}
.single_post_container .main {
  display: grid;
  row-gap: 20px;
}
.single_post_container .desctiprion {
  display: grid;
  row-gap: 20px;
}
.single_post_container .content_block {
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
  @media (max-width: 1400px) {
    grid-template-columns: 1fr;

    & .left_bar {
      display: none;
    }
  }
}
.bars {
  top: auto;

  display: grid;
  row-gap: 20px;
  align-content: start;
}
</style>
