<script setup lang="ts">
import { storeToRefs } from "pinia";

const { navLinks, footerLinks } = storeToRefs(useNavStorage());
const { addNewItem, deleteItem, deleteFooterLink } = useNavStorage();

const navSubmit = async (val: string) => {
  val && (await addNewItem({ title: val }, undefined));
  console.log(val);
};
const navDeleteHandler = async (id: string) => {
  id && (await deleteItem(id));
  console.log(id);
};

const footerSubmit = async (val: string) => {
  val && (await addNewItem(undefined, { title: val }));

  console.log(val);
};
const footerDeleteHandler = async (id: string) => {
  console.log(id);
  id && (await deleteFooterLink(id));
};
</script>

<template>
  <div class="wrapper_container">
    <GuardNavigationLinks
      label="Header Links"
      :links="navLinks"
      @link-emit="navSubmit"
      @delete-link="navDeleteHandler" />

    <GuardNavigationLinks
      label="Footer Links"
      :links="footerLinks"
      @link-emit="footerSubmit"
      @delete-link="footerDeleteHandler" />
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
