<script setup lang="ts">
import type { IComment } from "~/types";

interface IProps {
  comment: IComment;
}
defineProps<IProps>();
</script>

<template>
  <div class="user_comment_block" v-if="comment">
    <div v-if="!comment.Author?.avatarField" class="avatar">
      <UiElementsAddIcon
        icon-name="mingcute:user-4-fill"
        color-icon="#64748b"
        size-width="80"
        size-heigth="80" />
    </div>
    <div v-else class="avatar">
      <NuxtImg :src="comment.Author.avatarField.file_binary" :alt="comment.Author.userNameField" />
    </div>
    <div class="description">
      <div class="description__credentials">
        <h4>{{ comment.Author?.userNameField ?? comment.anonumousName }}</h4>
        <h5>{{ comment.date && formatDate(comment.date) }}</h5>
      </div>

      <div class="description__text">
        <p>
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.description {
  display: grid;
  row-gap: 10px;
  &__credentials {
    display: flex;
    column-gap: 10px;
  }
  &__text p {
    font-size: 1.2rem;
  }
}
.user_comment_block {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  column-gap: 20px;
}
</style>
