<script setup lang="ts">
import type { IPost } from "~/types";

interface IProps {
  singlePost: IPost;
  fontSize?: string | null;
  fontWeight?: number | null;
  rowSize?: string | null;
  showContent?: boolean;
  showShortBody?: boolean;
  showCategory?: boolean;
  showTitle?: boolean;
  showImage?: boolean;
  showDate?: boolean;
  classType?: string;
}

withDefaults(defineProps<IProps>(), {
  fontSize: "18px",
  fontWeight: 600,
  rowSize: "auto",
});
</script>

<template>
  <article class="single_post" :class="classType">
    <div class="tag" v-if="showCategory">
      <h5>{{ singlePost?.tags?.length && singlePost.tags[0].title?.toLocaleUpperCase() }}</h5>
    </div>
    <div class="title_post" v-if="showTitle">
      <NuxtLink :to="{ path: `/post/${singlePost?.id}` }">
        <p>{{ singlePost?.title }}</p>
      </NuxtLink>
    </div>

    <div class="preview_image" v-if="showImage">
      <!-- <img class="image" :src="singlePost?.image" alt="postPriview" /> -->

      <NuxtImg
        v-if="singlePost?.imagePrev"
        class="image"
        :src="`data:image/webp;base64,${singlePost.imageBg.file_binary}`"
        alt="Image" />
    </div>

    <div v-if="showShortBody" class="shortn_block">
      <p>{{ singlePost?.shortBody }}</p>
    </div>
    <div class="post_created" v-if="showDate">
      <span>
        By <b class="author">{{ singlePost?.author }}</b>
        {{ singlePost?.date && formatDate(singlePost.date) }}
      </span>
    </div>

    <div v-if="showContent" class="description_block">
      <div class="pre" v-html="singlePost?.body"></div>
      <div class="share_block_container">
        <UiElementsShareElement />
        <UiAddSocialMediaList :is-inline-block="true" :enable-bg="true" color-icon="white" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.share_block_container {
  display: flex;
  column-gap: 20px;
}

.single_post {
  display: grid;
  align-items: start;
  & .title_post a {
    & p {
      font-size: v-bind(fontSize);
      font-weight: v-bind(fontWeight);
    }
  }
  & .tag {
    & h5 {
      padding: 5px;
      display: inline-flex;
      background-color: var(--color-violet);
      color: var(--color-light);
      font-weight: 700;
    }
  }
  & .preview_image {
    width: 100%;
    height: 100%;
    & .image {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
  & .description_block {
    display: grid;
    row-gap: 20px;
    /*     & .pre {
      font-family: var(--font-standart);
      line-height: 1.6;
      white-space: pre-line;
      padding-left: 15px;

      @media (max-width: 600px) {
        & p {
          font-size: 20px;
        }
      }
    } */
  }
  & h5 {
    font-family: var(--font-italic);
    font-weight: 600;
  }
  & h1,
  h4,
  h5 {
    margin-top: 0;
    margin-bottom: 10px;
  }
  & .text {
    font-size: 1.1vw;
  }
  & p {
    line-height: 1.6;
  }
  & .shortn_block {
    padding-top: 30px;
    & p {
      font-size: 18px;
    }
  }

  @media (max-width: 480px) {
    & .share_block_container {
      display: none;
    }
  }
  @media (max-width: 1200px) {
    &.text {
      font-size: 1.4vw;
    }
  }
}

.title_content {
  display: grid;
  grid-template-rows: auto auto;
  row-gap: 20px;
  align-content: start;

  & .title_post {
    grid-row: 2;
    & p {
      font-size: v-bind(fontSize);
      font-weight: 600;
    }
  }
  & .post_created {
    grid-row: 3;
  }
}

.image_content_left {
  display: grid;
  grid-template-columns: 1fr 2fr;
  /*   grid-template-rows: auto auto 2fr; */
  column-gap: 20px;
  align-content: start;
  overflow: hidden;
  & .preview_image {
    grid-column: 1;
    grid-row: span 3;
  }

  & .title_post {
    grid-column: 2;
    grid-row: 1;

    & p {
      font-size: v-bind(fontSize);
      font-weight: 600;
    }
  }
  & .post_created {
    grid-column: 2;
    grid-row: 2;
  }
  & .shortn_block {
    grid-column: 2;
    grid-row: 3;
  }
  @media (max-width: 780px) {
    // overflow: auto;
    overflow: none;
    grid-template-columns: 1fr;
    grid-auto-rows: 250px auto 250px auto;
    row-gap: 20px;

    & .preview_image {
      grid-row: 1;
      grid-column: 1;
    }
    & .title_post {
      grid-row: 2;
      grid-column: 1;
    }
    & .shortn_block {
      grid-row: 3;
      grid-column: 1;
      overflow: hidden;
    }
    & .post_created {
      grid-row: 4;
      grid-column: 1;
      justify-self: end;
    }
  }
}
.image_content_rigth {
  display: grid;

  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr auto;
  gap: 20px;

  align-content: start;

  & .preview_image {
    grid-column: 2;
    grid-row: span 2;
  }
  & .title_post {
    grid-column: 1;
    grid-row: 1;
    & p {
      font-size: v-bind(fontSize);
      font-weight: 600;
    }
  }
  & .post_created {
    grid-column: 1;
    grid-row: 2;
  }
  @media (max-width: 1630px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    row-gap: 20px;
    align-content: start;
    & .preview_image {
      grid-column: 1;
      grid-row: 1;
    }
    & .tag {
      display: none;
    }

    & .title_post {
      grid-row: 2;
      & p {
        font-size: v-bind(fontSize);
        font-weight: 600;
      }
    }
    & .post_created {
      grid-row: 3;
      & .author {
        font-family: var(--font-italic);
      }
    }
  }
}
.image_content_top {
  display: grid;
  grid-template-rows: auto v-bind(rowSize) auto auto;
  row-gap: 20px;
  align-content: start;

  & .tag {
    grid-row: 1;
  }
  & .preview_image {
    grid-row: 2;
  }
  & .title_post {
    grid-row: 3;
    & p {
      font-size: v-bind(fontSize);
      font-weight: 600;
    }
  }
  & .post_created {
    grid-row: 4;
    & .author {
      font-family: var(--font-italic);
    }
  }
}
.image_content_middle {
  display: grid;

  row-gap: 20px;
  & .title_post p {
    font-size: v-bind(fontSize);
    font-weight: 600;
  }
  & .preview_image {
    height: v-bind(rowSize);
  }
  @media (max-width: 780px) {
    grid-template-rows: auto auto auto auto;
    & .preview_image {
      height: 100%;
    }
  }
}
</style>
