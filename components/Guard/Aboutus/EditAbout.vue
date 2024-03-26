<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IAbout } from "~/types";

const { aboutUs } = storeToRefs(useUnionStore());

// const state = reactive({
//   title: aboutUs.value?.length ? aboutUs.value[0].title : "",
//   description: aboutUs.value?.length ? aboutUs.value[0].description : "",
// });
const state = reactive({
  title: aboutUs.value[0]?.title ?? "",
  description: aboutUs.value[0]?.description ?? "",
});
// const { updateAboutUs, addAbout } = useAboutUsStore();
const { createOrUpdateData } = useUnionStore();
const submitForm = async () => {
  aboutUs.value[0]?.id &&
    (await createOrUpdateData<IAbout>(`about/update/${aboutUs.value[0].id}`, state));
  !aboutUs.value[0]?.id && (await createOrUpdateData<IAbout>("about/create", state));
};

// const fillState = () => {
//   aboutUs?.value?.id && (state.id = aboutUs?.value?.id);
//   aboutUs?.value?.title && (state.title = aboutUs?.value?.title);
//   aboutUs?.value?.aboutContent && (state.aboutContent = aboutUs?.value?.aboutContent);
// };

// onMounted(() => {
//   fillState();
// });
</script>

<template>
  <div class="edit_block">
    <!-- <input type="hidden"  :id="aboutUs.id" /> -->
    <LazyUiElementsAddPostInput
      label="Title"
      width-form="100%"
      font-size="2rem"
      name="title"
      placeholder="Input Title"
      v-model:value.trim="state.title" />
    <div class="edit_content">
      <label for="aboutContent">Content</label>
      <LazyUiElementsAddEditor v-model:value="state.description" />
    </div>
    <div class="btn_block">
      <LazyUiElementsAddButton
        title="Save "
        font-size="16px"
        paddings="0.4em"
        style="width: 150px"
        color-bg="dark"
        @click="submitForm"
        >Save Changes</LazyUiElementsAddButton
      >
    </div>
  </div>
</template>

<style scoped lang="scss">
.edit_block {
  margin-top: 30px;
  display: grid;
  grid-auto-rows: 40px auto 40px;
  row-gap: 50px;
}
</style>
