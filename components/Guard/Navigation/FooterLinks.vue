<script setup lang="ts">
import type { INavigation } from "types/INavigation";

defineProps({
  links: {
    type: Array as PropType<INavigation[]>,
  },
  default: null,
});

const emit = defineEmits(["footerEmit", "deleteFootLink"]);

const state = reactive({
  title: "",
});

const submitForm = () => {
  emit("footerEmit", state.title);
};
const deleteHandler = (id: string | undefined) => {
  id && emit("deleteFootLink", id);
};
</script>

<template>
  <div class="wrapper_block">
    <h2>Footer Links</h2>
    <div class="form_block">
      <LazyUiElementsAddPostInput
        label="Title"
        width-form="100%"
        font-size="2rem"
        name="title"
        placeholder="Input Title"
        v-model:value.trim="state.title" />
      <div class="btn_block">
        <LazyUiElementsAddButton
          title="Save"
          font-size="16px"
          paddings="0.4em"
          style="width: 150px"
          color-bg="dark"
          @click="submitForm"
          >Save</LazyUiElementsAddButton
        >
      </div>
    </div>
    <div class="list_block" v-if="links">
      <ul>
        <li v-for="(el, i) in links" :key="i" :id="el.id">
          <h4>{{ el.title }}</h4>
          <LazyUiElementsAddButton
            title="Delete"
            font-size="14px"
            paddings="0.4em"
            color-bg="dark"
            @click="deleteHandler(el.id)"
            >Delete</LazyUiElementsAddButton
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper_block .list_block ul {
  display: grid;
  row-gap: 10px;
  justify-content: start;
}
.list_block ul li {
  display: grid;
  grid-template-columns: auto 70px;
  column-gap: 20px;
  align-items: center;
}
.wrapper_block {
  display: grid;
  grid-template-columns: 300px;
  row-gap: 30px;
  align-items: start;
}
.wrapper_block .form_block {
  display: grid;
  grid-template-rows: 30px;
  row-gap: 20px;
}
</style>
