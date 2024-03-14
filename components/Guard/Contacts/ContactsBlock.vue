<script setup lang="ts">
import { storeToRefs } from "pinia";

const isEnable = ref(false);

const { stateData } = storeToRefs(useContactStore());
const { updateContacts } = useContactStore();
const submitForm = async () => {
  await updateContacts({ ...stateData.value });
};
</script>

<template>
  <div class="wrapper_block">
    <div class="list_block" v-if="stateData">
      <h2>Contacts</h2>
      <ul>
        <li>{{ stateData.copyright }}</li>
        <li>{{ stateData.adreess }}</li>
        <li>{{ stateData.telephone }}</li>
        <li>{{ stateData.email }}</li>
        <li>{{ stateData.fasbookLink }}</li>
        <li>{{ stateData.twetter }}</li>
        <li>{{ stateData.youtube }}</li>
        <li>{{ stateData.instagramm }}</li>
        <li>{{ stateData.vkontakte }}</li>
      </ul>
      <div class="btn_block">
        <LazyUiElementsAddButton
          title="Edit Data"
          font-size="16px"
          paddings="0.4em"
          style="width: 150px"
          color-bg="dark"
          @click="isEnable = !isEnable"
          >Edit Data</LazyUiElementsAddButton
        >
      </div>
    </div>
    <div class="form_block" v-if="isEnable && stateData">
      <LazyUiElementsAddPostInput
        label="Copyright"
        width-form="100%"
        font-size="2rem"
        name="copyright"
        placeholder="Input copyright"
        v-model:value.trim="stateData.copyright" />
      <LazyUiElementsAddPostInput
        label="Phone"
        width-form="100%"
        font-size="2rem"
        name="telephone"
        placeholder="Input telephone"
        v-model:value.trim="stateData.telephone" />
      <LazyUiElementsAddPostInput
        label="Email"
        width-form="100%"
        font-size="2rem"
        name="email"
        placeholder="Input email"
        v-model:value.trim="stateData.email" />
      <LazyUiElementsAddPostInput
        label="Adreess"
        width-form="100%"
        font-size="2rem"
        name="adreess"
        placeholder="Input adreess"
        v-model:value.trim="stateData.adreess" />
      <LazyUiElementsAddPostInput
        label="Fasbook"
        width-form="100%"
        font-size="2rem"
        name="fasbookLink"
        placeholder="Input fasbook link"
        v-model:value.trim="stateData.fasbookLink" />
      <LazyUiElementsAddPostInput
        label="Twetter"
        width-form="100%"
        font-size="2rem"
        name="twetter"
        placeholder="Input twetter link"
        v-model:value.trim="stateData.twetter" />
      <LazyUiElementsAddPostInput
        label="Youtube"
        width-form="100%"
        font-size="2rem"
        name="youtube"
        placeholder="Input youtube link"
        v-model:value.trim="stateData.youtube" />
      <LazyUiElementsAddPostInput
        label="Instagramm"
        width-form="100%"
        font-size="2rem"
        name="instagramm"
        placeholder="Input instagramm link"
        v-model:value.trim="stateData.instagramm" />
      <LazyUiElementsAddPostInput
        label="Vkontakte"
        width-form="100%"
        font-size="2rem"
        name="vkontakte"
        placeholder="Input vkontakte link "
        v-model:value.trim="stateData.vkontakte" />
      <div class="btn_block">
        <LazyUiElementsAddButton
          title="Update"
          font-size="16px"
          paddings="0.4em"
          style="width: 150px"
          color-bg="dark"
          @click="submitForm"
          >Update</LazyUiElementsAddButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper_block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 350px));
  row-gap: 30px;
}
.wrapper_block .list_block ul {
  display: grid;
  row-gap: 15px;
  justify-content: start;
}

.list_block ul li {
  display: grid;
  grid-template-columns: auto 70px;
  column-gap: 20px;
  align-items: center;
}
.wrapper_block .list_block {
  display: grid;
  row-gap: 30px;
}
.wrapper_block .form_block {
  display: grid;
  grid-auto-rows: 35px;
  row-gap: 20px;
}
</style>
