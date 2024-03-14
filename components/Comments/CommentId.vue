<script setup lang="ts">
import type { IComment } from "@/types/IComment";

defineProps({
  comment: {
    type: Object as PropType<IComment>,
  },
});
</script>

<template>
  <div class="user_comment_block" v-if="comment">
    <div v-if="!comment.avatar" class="avatar">
      <UiElementsAddIcon
        icon-name="mingcute:user-4-fill"
        color-icon="#64748b"
        size-width="80"
        size-heigth="80" />
    </div>
    <div v-else class="avatar">
      <img :src="comment.avatar" :alt="comment.avatar" />
    </div>
    <div class="description">
      <div class="credentials">
        <h4>{{ comment.author }}</h4>
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
