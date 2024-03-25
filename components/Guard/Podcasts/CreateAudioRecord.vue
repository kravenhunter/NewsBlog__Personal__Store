<script setup lang="ts">
import { storeToRefs } from "pinia";
import { compressToBestSize, getSizeImage } from "~/composables/compressFile";
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

const isLoading = ref(false);
const file_binary = ref<File | null>();
const adition_binary = ref<File | null>();

const { data } = useAuth();
const { createOrUpdateData, loadDataList } = useUnionStore();
const { categoryList, userCredentials } = storeToRefs(useUnionStore());

const state = reactive({
  title: "",
  description: "",
  tag: categoryList.value[categoryList.value.length - 1].title,
  authorId:
    userCredentials.value.find((el) => el.userNameField === data.value?.user?.name)?.id ?? "",
});

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
  isLoading.value = !isLoading.value;
  if (!v$.value.$error) {
    if (file_binary.value && adition_binary.value) {
      const getImageSize = await getSizeImage(file_binary.value);
      const getCompressedImageFile = await compressToBestSize(getImageSize, file_binary.value);
      if (getCompressedImageFile?.compressedFILE) {
        const body = new FormData();

        body.append("type", "audio");
        body.append("image_file", getCompressedImageFile?.compressedFILE, file_binary.value.name);
        body.append("audio_file", adition_binary.value, adition_binary.value.name);

        for (const item in state) {
          body.append(item, `${state[item as keyof typeof state]}`);
        }
        const result = await createOrUpdateData("file/upload", body);

        if (result && result.statusCode === 200) {
          result && result.statusCode === 200 && resetForm();
          await loadDataList("file/list-by-type/audio");
        }
      } else {
        console.log("Компрессия не удалась ");
      }
    }
  } else {
    // eslint-disable-next-line no-alert
    alert("not  submit!");
  }
  setTimeout(() => {
    isLoading.value = !isLoading.value;
  }, 500);
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

          <div class="upload">
            <label for="upload">Upload title image </label>
            <input type="file" name="upload" @change="onImageSelected" />
          </div>
          <div class="upload">
            <label for="upload">Upload audio </label>
            <input type="file" name="upload" @change="onAudioSelected" />
          </div>
        </div>
        <div class="select_block">
          <select v-model="state.tag">
            <option value="All">All</option>
            <option v-for="option in categoryList" :key="option.id" :value="option.title">
              {{ option.title }}
            </option>
          </select>
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
  width: min(100%, 1000px);
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
