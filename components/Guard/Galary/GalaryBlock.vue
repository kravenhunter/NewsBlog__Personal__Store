<script setup lang="ts">
import { storeToRefs } from "pinia";

// import { uuid } from 'vue-uuid';

const state = reactive({
  source: "",
  name: "",
  description: "",
  date: 0,
});
const isUpload = ref(false);
const fileList = ref<FileList>();

const { imageList } = storeToRefs(useGalaryStore());
const { uploadToStorage } = useGalaryStore();

const onFileSelected = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (fileList.value = fileEvent.files);
};
function resetForm() {
  state.date = 0;
  state.name = "";
  state.description = "";
  state.source = "";
}
const submitForm = async () => {
  fileList.value?.length && (isUpload.value = await uploadToStorage(fileList.value, state));
  isUpload.value && resetForm();
};
</script>

<template>
  <div class="galary_container grid_block">
    <h2>Galary</h2>
    <div class="galary_form grid_block">
      <UiElementsAddPostInput
        label="Name"
        width-form="100%"
        font-size="2rem"
        name="Name"
        placeholder="Input Image name"
        v-model:value.trim="state.name" />

      <UiElementsAddPostInput
        :is-input="false"
        label="Description"
        width-form="100%"
        font-size="2rem"
        paddings="1em"
        name="description"
        placeholder="Input Description"
        v-model:value.trim="state.description" />
      <div class="upload">
        <label for="upload">Upload image</label>
        <input type="file" name="upload" @change="onFileSelected" />
      </div>
      <div class="btn_block">
        <UiElementsAddButton
          title="Send"
          font-size="16px"
          paddings="0.4em"
          style="width: 150px"
          color-bg="dark"
          @click="submitForm"
          >Send</UiElementsAddButton
        >
      </div>
    </div>
    <div class="wrapp-body">
      <div class="wrapp-content">
        <GuardGalaryImageCard
          v-for="element in imageList.databaseList"
          :key="element.id"
          :source="element.source"
          :name="element.name"
          :description="element.description" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.grid_block {
  display: grid;
}
.galary_container {
  row-gap: 40px;
}
.galary_container .galary_form {
  max-width: 350px;

  grid-template-rows: 40px 120px;
  grid-auto-rows: 40px;
  row-gap: 40px;
}

.wrapp-body {
  font-family: serif;
  box-sizing: border-box;

  display: flex;

  justify-content: center;
  align-items: center;
}
.wrapp-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
}

.galary_block {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 400px));
  grid-auto-rows: 200px;
  gap: 30px;
}
.galary_block img {
  width: 100%;
  object-fit: cover;
}
</style>
