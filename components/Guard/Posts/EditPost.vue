<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import { storeToRefs } from "pinia";
import type { ICategory, IFileData } from "~/types";
import fileFromEvent from "~/utils/extractFileFromEvent";

interface Post {
  title: string;
  author: string;
  body: string;
  imageBg: IFileData;
  imagePrev: IFileData;
  shortBody: string;
  tags: ICategory[];
  // Comment  : string;
}

const { data } = useAuth();
const route = useRoute();

const isCreated = ref("");
const createResponse = ref<NuxtError>();

const file_binary = ref<File | null>();

const { categoryList } = storeToRefs(useUnionStore());
const { createOrUpdateData, getPostById } = useUnionStore();

const getPost = getPostById(String(route.params.id));

const state = reactive({
  title: getPost?.id ?? "",
  author: data.value?.user?.name ?? "",
  shortBody: getPost?.shortBody ?? "",
  body: getPost?.body ?? "",
  tags: getPost?.tags.length ? getPost.tags : ([] as ICategory[]),
});
const selectedTags = ref<string>();

watch(selectedTags, () => {
  const getTag = categoryList.value.find((el) => el.title === selectedTags.value);
  getTag && state.tags.push(getTag);
});

const onFileSelected = async (event: Event) => {
  file_binary.value = fileFromEvent(event);
};

const resetForm = () => {
  state.title = "";
  state.author = "";
  state.shortBody = "";
  state.body = "";
};
const v$ = validatePostHelper(state);

// const fillState = (id: string) => {
//   const getArticle = getArticleById(id);
//   getArticle?.id && (state.id = getArticle.id);
//   getArticle?.title && (state.title = getArticle.title);
//   getArticle?.author && (state.author = getArticle.author);
//   getArticle?.category && (state.category = getArticle.category);
//   getArticle?.image && (state.image = getArticle.image);
//   getArticle?.imageMeta && (state.imageMeta = getArticle.imageMeta);
//   getArticle?.shortBody && (state.shortBody = getArticle.shortBody);
//   getArticle?.body && (state.body = getArticle.body);
//   state.date = 0;
// };
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
    const body = new FormData();
    file_binary.value && body.append("file_binary", file_binary.value, file_binary.value.name);

    if (getPost?.id) {
      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData(`post/update/${getPost?.id}`, body);

      result && creatingResult(result.statusCode, result.statusMessage);
      //  result &&  resetForm();
    } else {
      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData("post/create", body);
      result && creatingResult(result.statusCode, result.statusMessage);
    }
  } else {
    creatingResult(405, "Form not submit. Try again.");
  }
};

// onMounted(() => {
//   route.params.id && fillState(String(route.params.id));
// });
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

          <div class="select_block" v-if="categoryList">
            <label for="category">Category</label>
            <select name="category" v-model.trim="selectedTags">
              <option v-for="option in categoryList" :key="option.id" :value="option.title">
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
