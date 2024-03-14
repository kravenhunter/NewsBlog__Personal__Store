<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import { storeToRefs } from "pinia";

const route = useRoute();

const state = reactive({
  id: "",
  title: "",
  author: "",
  category: "",
  image: "",
  imageMeta: "",
  shortBody: "",
  body: "",
  date: 0,
});
const isCreated = ref("");
const createResponse = ref<NuxtError>();
const fileList = ref<FileList>();

const { categoryState } = storeToRefs(useCategoryStorage());
const { addPost, updatePost, getArticleById } = useArticleStore();

const onFileSelected = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (fileList.value = fileEvent.files);
};

const resetForm = () => {
  state.title = "";
  state.author = "";
  state.category = "";
  state.image = "";
  state.shortBody = "";
  fileList.value = {} as FileList;
  state.body = "";
  state.date = 0;
};
const v$ = validatePostHelper(state);

const fillState = (id: string) => {
  const getArticle = getArticleById(id);
  getArticle?.id && (state.id = getArticle.id);
  getArticle?.title && (state.title = getArticle.title);
  getArticle?.author && (state.author = getArticle.author);
  getArticle?.category && (state.category = getArticle.category);
  getArticle?.image && (state.image = getArticle.image);
  getArticle?.imageMeta && (state.imageMeta = getArticle.imageMeta);
  getArticle?.shortBody && (state.shortBody = getArticle.shortBody);
  getArticle?.body && (state.body = getArticle.body);
  state.date = 0;
};
const responseHandler = async (path: string | undefined) => {
  path && setTimeout(async () => await clearError({ redirect: path }), 1000);
  !path && (await clearError());
  isCreated.value = "";
};
const creatingResult = (statusCode: number, message: string) => {
  if (statusCode === 200) {
    resetForm();
    isCreated.value = "created";
    createResponse.value = createError({ statusCode: 200, statusMessage: message });
  } else {
    isCreated.value = "error";
    createResponse.value = createError({ statusCode: 405, statusMessage: message });
  }
};
const submitForm = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    if (state.id) {
      const result = await updatePost(fileList.value, state);
      creatingResult(result.statusCode, result.message);
    } else {
      if (fileList.value) {
        const result = await addPost(fileList.value, state);
        creatingResult(result.statusCode, result.message);
      }
    }
  } else {
    creatingResult(405, "Form not submit. Try again.");
  }
};

onMounted(() => {
  route.params.id && fillState(String(route.params.id));
});
</script>

<template>
  <div class="add_post">
    <div v-if="!isCreated">
      <div class="post_form">
        <div class="form_inputs">
          <UiElementsAddPostInput
            label="Title"
            width-form="100%"
            font-size="2rem"
            name="title"
            placeholder="Input Title"
            v-model:value.trim="v$.title.$model"
            :error="v$.title.$errors" />
          <UiElementsAddPostInput
            label="Author"
            width-form="100%"
            font-size="2rem"
            name="author"
            placeholder="Input your Author"
            v-model:value.trim="v$.author.$model"
            :error="v$.author.$errors" />

          <div class="select_block" v-if="categoryState">
            <label for="category">Category</label>
            <select name="category" v-model.trim="state.category">
              <option v-for="option in categoryState" :key="option.id" :value="option.title">
                {{ option.title }}
              </option>
            </select>
          </div>
          <div class="upload">
            <label for="upload">Upload image</label>
            <input type="file" name="upload" @change="onFileSelected" />
          </div>
        </div>

        <div class="content_group">
          <div class="content_item">
            <UiElementsAddPostInput
              :is-input="false"
              label="Short body"
              width-form="100%"
              font-size="2rem"
              paddings="1em"
              name="shortBody"
              placeholder="Input your Short Body"
              v-model:value.trim="v$.shortBody.$model"
              :error="v$.shortBody.$errors" />
          </div>
          <div class="content_item">
            <label for="body">Content</label>
            <UiElementsAddEditor v-if="state.body" v-model:value="state.body" />
          </div>
        </div>
        <div class="btn_block">
          <UiElementsAddButton
            title="Add Post"
            font-size="16px"
            paddings="0.4em"
            style="width: 150px"
            color-bg="dark"
            @click="submitForm"
            >Save Post</UiElementsAddButton
          >
        </div>
      </div>

      <div class="editor_content" v-html="state.body"></div>
    </div>
    <LazyUiElementsWindowPopUp
      v-else-if="isCreated === 'created'"
      :is-show="isCreated === 'created'">
      <ErrorResponse :error-event="createResponse" :use-slot="true" :show-status-code="false">
        <UiElementsAddButton
          title="Back"
          color-bg="dark"
          font-size="1rem"
          :show-slot="true"
          @click="responseHandler('/guard/posts')"
          >BACK TO LIST</UiElementsAddButton
        >
      </ErrorResponse>
    </LazyUiElementsWindowPopUp>

    <LazyUiElementsWindowPopUp v-else-if="isCreated === 'error'" :is-show="isCreated === 'error'">
      <ErrorResponse :error-event="createResponse" :use-slot="true" :show-status-code="false">
        <UiElementsAddButton
          title="Back"
          color-bg="dark"
          font-size="1rem"
          :show-slot="true"
          @click="responseHandler"
          >CLOSE</UiElementsAddButton
        >
      </ErrorResponse>
    </LazyUiElementsWindowPopUp>
  </div>
</template>

<style scoped lang="scss">
.select_block {
  & select {
    background-color: transparent;
    color: var(--color-dark);
    border: 1px solid var(--color-dark);
  }
  & label {
    margin-right: 15px;
  }
}
.content_group {
  display: grid;
  grid-template-rows: 120px;
  row-gap: 50px;
}
.form_inputs {
  display: grid;
  grid-auto-rows: 40px;
  row-gap: 50px;
}
.add_post .post_form {
  display: grid;
  row-gap: 50px;
}
.btn_block {
  display: flex;
  justify-content: flex-end;
}
.content_box pre {
  width: 100%;
  height: 100%;
  white-space: pre-line;
  line-height: 1.6;
}

.content_box {
  white-space: pre-line;
  line-height: 1.6;
  font-size: 1.1rem;
}
</style>
