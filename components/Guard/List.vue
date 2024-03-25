<script setup lang="ts">
import type { IPost } from "~/types";

interface IProps {
  list?: IPost[] | null;
  singlePost?: IPost | null;
  label?: string | null;
  directionCard?: string;
  directionContainer?: string | null;
  row?: string | null;
  showBody?: boolean | null;
  showShort?: boolean | null;
}

withDefaults(defineProps<IProps>(), {
  directionContainer: "1fr",
  row: "auto",
});

// defineProps({
//   list: {
//     type: Array as PropType<IArticle[]>,
//     default: () => [],
//   },
//   singlePost: {
//     type: Object as PropType<IArticle>,
//     default: () => {},
//   },
//   label: {
//     type: String,
//     default: '',
//   },
//   directionCard: {
//     type: String,
//     reqired: false,
//   },
//   directionContainer: {
//     type: String,
//     reqired: '1fr',
//   },
//   row: {
//     type: String,
//     reqired: 'auto',
//   },
//   showBody: {
//     type: Boolean,
//     reqired: false,
//   },
//   showShort: {
//     type: Boolean,
//     reqired: false,
//   },
// });
</script>

<template>
  <div class="posts_container">
    <h2 v-if="label" class="title_block">{{ label }}</h2>

    <div class="post_list" v-if="list">
      <LazyGuardPreviewForList
        :grid-direction="directionCard"
        v-for="(post, i) in list"
        :key="i"
        :post="post"
        :is-show-body="showBody"
        :is-show-short="showShort" />
    </div>
  </div>
</template>

<style scoped>
.posts_container {
  display: grid;
  grid-template-columns: v-bind(directionContainer);
  grid-auto-rows: v-bind(row);
  row-gap: 20px;
}
</style>
