<script setup lang="ts">
import { storeToRefs } from "pinia";
import { compressToBestSize, getSizeImage } from "~/composables/compressFile";

// import { uuid } from 'vue-uuid';

const isLoading = ref(false);
const fileData = ref<File | null>();

const { imageList, categoryList } = storeToRefs(useUnionStore());
const { createOrUpdateData, deleteDataById, isItemExist } = useUnionStore();

const state = reactive({
  title: "",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore atque voluptas!",
  tag: categoryList.value[0]?.title ?? "World",
});

const onFileSelected = async (event: Event) => {
  fileData.value = extractFileFromEvent(event);
};

function resetForm() {
  state.title = "";
}

const submitForm = async () => {
  isLoading.value = !isLoading.value;
  if (fileData.value) {
    const getImageSize = await getSizeImage(fileData.value);
    const getCompressedFile = await compressToBestSize(getImageSize, fileData.value);
    if (getCompressedFile) {
      const body = new FormData();
      body.append(
        "image_file",
        getCompressedFile.compressedFILE,
        getCompressedFile.compressedFILE.name,
      );
      body.append("type", "image");
      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData("file/upload", body);

      result && result.statusCode === 200 && resetForm();
      console.log(result);
    }
  }
  setTimeout(() => {
    isLoading.value = !isLoading.value;
  }, 500);
};

const deleteHaandler = async (itemId: string) => {
  console.log(itemId);
  if (isItemExist(itemId, "images")) {
    await deleteDataById(`file/delete-by-id/${itemId}`);
  }
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
        v-model:value.trim="state.title" />

      <UiElementsAddPostInput
        :is-input="false"
        label="Description"
        width-form="100%"
        font-size="2rem"
        paddings="1em"
        name="description"
        placeholder="Input Description"
        v-model:value.trim="state.description" />
      <div class="select_block" v-if="categoryList">
        <label for="category">Category</label>
        <select name="category" v-model.trim="state.tag">
          <option v-for="option in categoryList" :key="option.id" :value="option.title">
            {{ option.title }}
          </option>
        </select>
      </div>
      <div class="upload">
        <label for="upload">Upload image</label>
        <input type="file" name="upload" @change="onFileSelected" />
      </div>
      <div class="btn_block">
        <UiElementsAddButton
          :disabled="isLoading"
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
      <div class="wrapp-content" v-if="imageList?.length">
        <LazyGuardGalaryImageCard
          v-for="element in imageList"
          :key="element.id"
          :item-id="element.id"
          :image="element"
          @remove="deleteHaandler" />
      </div>
    </div>
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
  /* box-sizing: border-box; */

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
