<script setup lang="ts">
import type { INavigation } from "~/types";

interface IProps {
  links?: INavigation[] | null;
  label: string;
}

const props = withDefaults(defineProps<IProps>(), {
  label: "label",
});

const emit = defineEmits(["linkEmit", "deleteLink"]);

const state = reactive({
  title: "",
});
const submitForm = () => {
  emit("linkEmit", { title: state.title, field: props.label });
};
const deleteHandler = (linkId: string | undefined) => {
  linkId && emit("deleteLink", { id: linkId, field: props.label });
};
</script>

<template>
  <div class="wrapper_block">
    <h2>{{ label }}</h2>
    <div class="form_block">
      <LazyUiElementsAddPostInput
        label="Title"
        width-form="100%"
        font-size="2rem"
        :name="label"
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
}
.wrapper_block .form_block {
  display: grid;
  grid-template-rows: 30px;
  row-gap: 20px;
}
</style>
