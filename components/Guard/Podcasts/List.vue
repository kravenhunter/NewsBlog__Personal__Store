<script setup lang="ts">
import type { IPodcast } from "types/IPodcast";

defineProps({
  list: {
    type: Array as PropType<IPodcast[]>,
    default: null,
  },
  singlePost: {
    type: Object as PropType<IPodcast>,
    default: null,
  },
  label: {
    type: String,
    default: "",
  },
  directionCard: {
    type: String,
    reqired: false,
  },
  directionContainer: {
    type: String,
    reqired: "1fr",
  },
  row: {
    type: String,
    reqired: "auto",
  },
  showBody: {
    type: Boolean,
    reqired: false,
  },
});

const { deletePodcast } = usePodcastsStore();
</script>

<template>
  <div class="podcast_block" v-if="list">
    <div class="postListPreview" v-for="(el, i) in list" :key="i">
      <div class="img_block">
        <img :src="el.imageLink" alt="randomGirl" />
      </div>

      <div class="description">
        <NuxtLink :to="{ path: `/${el.category}/${el.id}` }">
          <h2 class="title">{{ el.title }}</h2>
        </NuxtLink>

        <p class="created">By {{ el.userName }} {{ el.date && formatDate(el.date) }}</p>
        <p class="post_body" v-if="showBody">
          {{ el.description }}
        </p>
      </div>
      <div class="edit_block">
        <UiElementsAddIcon
          icon-name="bx:edit"
          color-icon="black"
          size-width="24"
          size-heigth="24" />

        <button class="delete" @click="deletePodcast(el.id)">&times;</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.img_block {
  max-width: 250px;
  max-height: 250px;
}
.podcast_block {
  display: grid;
  grid-auto-rows: v-bind(row);
  overflow: hidden;
}
.edit_block .edit,
.edit_block .delete {
  background-color: var(--color-light);
  background-color: transparent;
  color: var(--color-dark);
  font-size: 33px;
  margin-left: 15px;
  cursor: pointer;
}

.postListPreview {
  margin-top: 15px;
  display: grid;
  grid-template-columns: v-bind(directionCard);

  justify-content: center;
  gap: 20px;
  overflow: hidden;
}
.postListPreview .description {
  display: grid;
  grid-template-rows: 50px 50px auto;
  row-gap: 10px;
}
.postListPreview .post_body {
  font-size: 1rem;
  overflow: hidden;
}
.postListPreview img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}
.postListPreview h4 {
  margin-top: 15px;
}
</style>
