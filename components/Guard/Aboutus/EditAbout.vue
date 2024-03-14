<script setup lang="ts">
import { storeToRefs } from "pinia";

const state = reactive({
  id: "",
  title: "",
  aboutContent: "",
});

const { aboutUs } = storeToRefs(useAboutUsStore());
const { updateAboutUs, addAbout } = useAboutUsStore();

const submitForm = async () => {
  await updateAboutUs(state);
};
const fillState = () => {
  aboutUs?.value?.id && (state.id = aboutUs?.value?.id);
  aboutUs?.value?.title && (state.title = aboutUs?.value?.title);
  aboutUs?.value?.aboutContent && (state.aboutContent = aboutUs?.value?.aboutContent);
};

onMounted(() => {
  fillState();
});
</script>

<template>
  <div class="edit_block" v-if="aboutUs">
    <input type="hidden" :id="state.id" />
    <LazyUiElementsAddPostInput
      label="Title"
      width-form="100%"
      font-size="2rem"
      name="title"
      placeholder="Input Title"
      v-model:value.trim="state.title" />
    <div class="edit_content">
      <label for="aboutContent">Content</label>
      <LazyUiElementsAddEditor v-model:value="state.aboutContent" />
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
