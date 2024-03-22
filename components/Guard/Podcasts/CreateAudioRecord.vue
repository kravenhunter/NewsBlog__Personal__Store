<script setup lang="ts">
import fileFromEvent from "~/utils/extractFileFromEvent";

interface IFileData {
  id?: string;
  update_at?: number;
  title?: string;
  file_type?: string;
  file_binary: string;
  adition_binary?: string;
  description: string;
}

const state = reactive({
  title: "",
  description: "",
});

const file_binary = ref<File | null>();
const adition_binary = ref<File | null>();

const { createOrUpdateData } = useUnionStore();

const onImageSelected = async (event: Event) => {
  file_binary.value = fileFromEvent(event);
};
const onAudioSelected = async (event: Event) => {
  adition_binary.value = fileFromEvent(event);
};
const v$ = validatePodcastHelper(state);
const resetForm = () => {
  state.title = "";

  state.description = "";

  file_binary.value = null;
  adition_binary.value = null;
};

const submitForm = async () => {
  v$.value.$validate();
  if (!v$.value.$error) {
    if (file_binary.value && adition_binary.value) {
      const body = new FormData();

      body.append("file_binary", file_binary.value, file_binary.value.name);
      body.append("adition_binary", adition_binary.value, adition_binary.value.name);

      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData("file/upload", body);

      result && result.statusCode === 200 && resetForm();
    }
  } else {
    // eslint-disable-next-line no-alert
    alert("not  submit!");
  }
};
</script>

<template>
  <div class="new_post_container">
    <h3>Create Podcast</h3>
    <div class="add_post">
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

          <div class="upload">
            <label for="upload">Upload title image </label>
            <input type="file" name="upload" @change="onImageSelected" />
          </div>
          <div class="upload">
            <label for="upload">Upload audio </label>
            <input type="file" name="upload" @change="onAudioSelected" />
          </div>
        </div>

        <div class="content_group">
          <div class="content_item">
            <UiElementsAddPostInput
              :is-input="false"
              label="Description"
              width-form="100%"
              font-size="2rem"
              paddings="1em"
              name="shortBody"
              placeholder="Input your description"
              v-model:value.trim="v$.description.$model"
              :error="v$.description.$errors" />
          </div>
        </div>
        <div class="btn_block">
          <UiElementsAddButton
            title="Add Podcast"
            font-size="16px"
            paddings="0.4em"
            style="width: 150px"
            color-bg="dark"
            @click="submitForm"
            >Save</UiElementsAddButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.new_post_container {
  display: grid;
  grid-template-columns: 1230px;
  justify-content: center;
  row-gap: 30px;
}
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
