<script setup lang="ts">
import { storeToRefs } from "pinia";

const isLoading = ref(false);
const fileData = ref<File | null>();

const { advertiseList, userCredentials } = storeToRefs(useUnionStore());
const { createOrUpdateData, deleteDataById, isItemExist, getAuthUserByName } = useUnionStore();
const { data, status } = useAuth();

const state = reactive({
  name: "",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias inventore atque voluptas!",
  tag: "Advertising",
  authorId:
    userCredentials.value.find((el) => el.userNameField === data.value?.user?.name)?.id ?? "",
});

console.log(userCredentials.value);

const onFileSelected = async (event: Event) => {
  fileData.value = extractFileFromEvent(event);
};
function resetForm() {
  state.name = "";
}

const submitForm1 = async () => {
  const {
    data: response,
    error,
    refresh,
  } = await useFetch(`/api/auth/me`, {
    method: "POST",
    body: { email: "admin@ya.ru" },
  });
  console.log(response.value);
  console.log(status.value);
};
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

      for (const item in state) {
        body.append(item, `${state[item as keyof typeof state]}`);
      }
      const result = await createOrUpdateData("advertise/create", body);

      result && result.statusCode === 200 && resetForm();
      console.log(result);
    }
  }
  setTimeout(() => {
    isLoading.value = !isLoading.value;
  }, 500);
};
const deleteHaandler = async (adver_id: string) => {
  console.log(adver_id);
  if (isItemExist(adver_id, "advertise")) {
    await deleteDataById(`advertise/delete-by-id/${adver_id}`);
  }
};
// onMounted(() => console.log(advertiseList.value.databaseList));
</script>

<template>
  <div class="galary_container grid_block">
    <h2>Advertise Cards</h2>
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
        <input type="file" name="upload" @change="onFileSelected" />
      </div>
      <div class="btn_block">
        <UiElementsAddButton
          :disabled="isLoading"
          title="Upload"
          font-size="16px"
          paddings="0.4em"
          style="width: 150px"
          color-bg="dark"
          @click="submitForm"
          >Upload</UiElementsAddButton
        >
      </div>
    </div>
    <div class="wrapp-body" v-if="advertiseList?.length">
      <div class="wrapp-content">
        <LazyGuardGalaryImageCard
          v-for="element in advertiseList"
          :key="element.id"
          :title="element.name"
          :item-id="element.id"
          :image="element.source"
          @remove="deleteHaandler" />
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
