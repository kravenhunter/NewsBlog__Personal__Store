<script setup lang="ts">
import type { IPost } from "~/types";

interface IProps {
  post?: IPost | null;
  gridDirection: string;
  isShowBody?: boolean | null;
  isShowShort?: boolean | null;
}

withDefaults(defineProps<IProps>(), {
  gridDirection: "1fr",
});

// defineProps({
//   post: {
//     type: Object as PropType<IPost>,
//     default: () => {},
//   },
//   gridDirection: {
//     type: String,
//     default: "1fr",
//   },
//   isShowBody: {
//     type: Boolean,
//     default: false,
//   },
//   isShowShort: {
//     type: Boolean,
//     default: false,
//   },
// });

const { deleteDataById, isPostExist } = useUnionStore();

const goNext = (routeName: string, id: string | undefined) => {
  id && isPostExist(id) && navigateTo(`/guard/${routeName}/${id}`);
};
</script>

<template>
  <div class="postListPreview" v-if="post?.id">
    <NuxtImg :src="`data:image/webp;base64,${post.imagePrev.file_binary}`" :alt="post.title" />
    <div class="description">
      <h2 class="title" @click="goNext('post', post.id)">{{ post.title }}</h2>

      <p class="created">{{ post.date && formatDate(post.date) }}</p>
      <p class="post_body" v-if="isShowShort">
        {{ post.shortBody }}
      </p>
      <p class="post_body" v-if="isShowBody">
        {{ post.body }}
      </p>
    </div>
    <div class="edit_block">
      <button class="edit" @click="goNext('edit', post.id)">
        <UiElementsAddIcon
          icon-name="bx:edit"
          color-icon="black"
          size-width="24"
          size-heigth="24" />
      </button>

      <button class="delete" @click="deleteDataById(post.id)">&times;</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  grid-template-columns: v-bind(gridDirection);

  justify-content: center;
  gap: 20px;
  overflow: hidden;
}
.postListPreview .description {
  display: grid;
  row-gap: 10px;
  & .title {
    cursor: pointer;
  }
}
.postListPreview .post_body {
  font-size: 1rem;
  overflow: hidden;
}
.postListPreview img {
  object-fit: cover;
  height: 100%;
}
.postListPreview h4 {
  margin-top: 15px;
}
</style>
