<script setup lang="ts">
import type { IComment } from "types/IComment";

const props = defineProps({
  postId: {
    type: String,
  },
});

const { addComment, loadCommentsByPostId } = useCommentsStore();

const newComment = ref<IComment>({});
async function handleClick(id: string) {
  newComment.value.postId = id;
  if (
    newComment.value.postId &&
    newComment.value.author &&
    newComment.value.userId &&
    newComment.value.body
  ) {
    const status = await addComment(newComment.value);
    status.statusCode === 200
      ? (newComment.value = {})
      : console.log(`Error ${status.statusCode} ${status.message}`);
  } else {
    console.log(`Form is empty`);
  }
}
onMounted(async () => {
  await loadCommentsByPostId(props.postId);
});
</script>

<template>
  <div class="comments_form_block" v-if="postId">
    <h3>LEAVE COMMENT</h3>
    <div class="form_block">
      <textarea
        class="text_section input"
        type="text"
        placeholder="Leave comment"
        v-model="newComment.body" />
      <div class="input_group">
        <input
          class="user_name input"
          type="text"
          placeholder="Name *"
          v-model="newComment.author" />
        <input
          class="user_email input"
          type="text"
          placeholder="Email *"
          v-model="newComment.userId" />
        <input class="user_phone input" type="text" placeholder="Phone" />
      </div>
    </div>
    <div class="btn_form">
      <UiElementsAddButton
        @click="handleClick(postId)"
        title="Add comment"
        font-size="15px"
        color-bg="#000000"
        >POST COMMENT</UiElementsAddButton
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.comments_form_block {
  display: grid;
  row-gap: 20px;
}

.comments_form_block .form_block {
  display: grid;
  grid-template-rows: 200px 40px;
  row-gap: 30px;
}
.comments_form_block .input_group {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 10px;
}
.comments_form_block .input {
  background-color: var(--color-light);
  border: 1px solid black;
  color: var(--color-dark);
  padding-left: 10px;
  width: 100%;
}
</style>
