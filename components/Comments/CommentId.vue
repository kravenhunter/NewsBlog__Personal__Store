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
      <NuxtImg
        :src="`data:image/webp;base64,${comment.Author.avatarField.file_binary}`"
        :alt="comment.Author.userNameField" />
    </div>
    <div class="description">
      <div class="credentials">
        <h4>{{ comment.Author?.userNameField }}</h4>
        <h5>{{ comment.date && formatDate(comment.date) }}</h5>
      </div>
      <div class="admin_message"><p>Your comment is awaiting moderation</p></div>
      <div class="text">
        <p>
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.description .credentials {
  display: flex;
  column-gap: 10px;
}
.description {
  display: grid;
  row-gap: 10px;
}
.user_comment_block {
  display: grid;
  grid-template-columns: 0.1fr 1fr;
  column-gap: 20px;
}
</style>
