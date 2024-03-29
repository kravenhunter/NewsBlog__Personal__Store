<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IAbout } from "~/types";

interface IProps {
  about?: IAbout;
}
const props = defineProps<IProps>();

const { aboutUs } = storeToRefs(useUnionStore());

const state = reactive({
  title: props.about?.title ?? "",
  description: props.about?.description ?? "",
});

const { createOrUpdateData } = useUnionStore();
const submitForm = async () => {
  props.about?.id && (await createOrUpdateData<IAbout>(`about/update/${props.about.id}`, state));
  !props.about?.id && (await createOrUpdateData<IAbout>("about/create", state));
};
</script>

<template>
  <div class="edit_block">
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
