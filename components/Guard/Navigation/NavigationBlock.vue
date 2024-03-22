<script setup lang="ts">
import { storeToRefs } from "pinia";

const { navLiks, footerLinks } = storeToRefs(useUnionStore());
const { createOrUpdateData, deleteDataById } = useUnionStore();

const submit = async (val: { title: string; field: string }) => {
  console.log(val);
  if (val) {
    val.field === "Header Links" &&
      (await createOrUpdateData(`nav-link/create`, { title: val.title }));
    val.field === "Footer Links" &&
      (await createOrUpdateData(`footer-link/create`, { title: val.title }));
  }
};
const deleteHandler = async (val: { id: string; field: string }) => {
  // id && (await deleteDataById(`${type}/delete-by-id/${id}`));
  if (val) {
    val.field === "Header Links" && (await deleteDataById(`nav-link/delete-by-id/${val.id}`));
    val.field === "Footer Links" && (await deleteDataById(`footer-link/delete-by-id/${val.id}`));
  }
};
</script>

<template>
  <div class="wrapper_container">
    <GuardNavigationLinks
      label="Header Links"
      :links="navLiks"
      @link-emit="submit"
      @delete-link="deleteHandler" />

    <GuardNavigationLinks
      label="Footer Links"
      :links="footerLinks"
      @link-emit="submit"
      @delete-link="deleteHandler" />
  </div>
</template>

<style scoped lang="scss">
.wrapper_container {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  align-items: start;
  column-gap: 30px;
}
</style>
