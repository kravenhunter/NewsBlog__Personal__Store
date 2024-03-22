<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import { storeToRefs } from "pinia";
import type { ICategory } from "~/types";
import fileFromEvent from "~/utils/extractFileFromEvent";

const { data } = useAuth();
const state = reactive({
  title: "",
  author: data.value?.user?.name ?? "",
  shortBody: "",
  body: "",
  tags: [] as ICategory[],
});

const file_binary = ref<File | null>();

const { categoryList } = storeToRefs(useUnionStore());
const { createOrUpdateData } = useUnionStore();

const isCreated = ref("");

const resetForm = () => {
  state.title = "";
  state.author = "";
  state.tags = [];
  state.shortBody = "";
  state.body = "";
};
const createResponse = ref<NuxtError>();

const selectedTags = ref<string>();

watch(selectedTags, () => {
  const getTag = categoryList.value.find((el) => el.title === selectedTags.value);
  getTag && state.tags.push(getTag);
});

const onFileSelected = async (event: Event) => {
  file_binary.value = fileFromEvent(event);
};

const v$ = validatePostHelper(state);

const responseHandler = async (path: string | undefined) => {
  path && setTimeout(async () => await clearError({ redirect: path }), 1000);
  !path && (await clearError());
  isCreated.value = "";
};

const submitForm = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    const body = new FormData();
    file_binary.value && body.append("file_binary", file_binary.value, file_binary.value.name);

    if (file_binary.value) {
      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData(`post/create`, body);

      if (result && result.statusCode === 200) {
        resetForm();
        isCreated.value = "created";
        createResponse.value = createError({
          statusCode: 200,
          statusMessage: result.statusMessage,
        });
      } else {
        isCreated.value = "error";
        createResponse.value = createError({ statusCode: 405, statusMessage: "Can't save post" });
      }
    }
  } else {
    // console.log(v$.value.$errors[0]);
    isCreated.value = "error";
    createResponse.value = createError({
      statusCode: 405,
      statusMessage: "Form not submit. Try again.",
    });
  }
};
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
            <UiElementsAddEditor v-model:value="state.body" />
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
  margin-bottom: 50px;
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
