<script setup lang="ts">
import { storeToRefs } from "pinia";

const state = reactive({
  name: "",
  description: "",
});
const isUpload = ref(false);
const fileData = ref<File | null>();

const { advertiseList } = storeToRefs(useUnionStore());

const { createOrUpdateData, deleteDataById } = useUnionStore();

const onFileSelected = async (event: Event) => {
  fileData.value = extractFileFromEvent(event);
};
function resetForm() {
  state.name = "";
  state.description = "";
}

const submitForm = async () => {
  if (fileData.value) {
    const body = new FormData();

    body.append("file", fileData.value, fileData.value.name);

    for (const item in state) {
      body.append(item, `${state[item as keyof typeof state]}`);
    }
    // console.log(body);
    // const {
    //   data: response,
    //   error,
    //   refresh,
    // } = await useFetch(`/api/advertise/create`, {
    //   method: "POST",
    //   body,
    // });

    // for (const item of body.keys()) {
    //   const getData = body.get(item);
    //   console.log(`${item} ==>`, getData);
    // }
    // for (const item of body) {
    //   console.log(item);
    //   // const getData = body.get(item);
    //   // console.log(getData);
    // }
    const result = await createOrUpdateData("advertise/create", body);

    result && result.statusCode === 200 && resetForm();
  }
};
interface IType {
  id: string;
  name: string;
  source: {
    id: string;
    title: string;
    file_type: string;
    file_binary: string;
    adition_binary?: string;
  };
}
const deleteHaandler = async (adver_id: string) => {
  console.log(adver_id);
  if (adver_id) {
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
          :advertise-id="element.id"
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
