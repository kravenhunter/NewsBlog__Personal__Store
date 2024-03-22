<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { ISocial } from "~/types";

const isEnable = ref(false);

const { contactList } = storeToRefs(useUnionStore());

const state = reactive({
  copyright: contactList.value[0].copyright ?? "",
  phone: contactList.value[0].phone ?? "",
  email: contactList.value[0].email ?? "",
  adress: contactList.value[0].adress ?? "",
  Socials: contactList.value[0].Socials?.length ? contactList.value[0].Socials : ([] as ISocial[]),
});
const socialData = ref<ISocial>({});
const { createOrUpdateData } = useUnionStore();
const submitForm = async () => {
  if (contactList.value?.length) {
    await createOrUpdateData(`contacts/update/${contactList.value[0].id}`, { ...state });
  } else {
    await createOrUpdateData("contacts/create", { ...state });
  }
};
const addLink = () => {
  socialData.value.title && socialData.value.link && state.Socials.push({ ...socialData.value });
  socialData.value.title = "";
  socialData.value.link = "";
};
</script>

<template>
  <div class="wrapper_block">
    <div class="list_block">
      <h2>Contacts</h2>

      <ul>
        <li>Copyright: {{ state.copyright ?? "     ----/----" }}</li>
        <li>Adress: {{ state.adress ?? "     ----/----" }}</li>
        <li>Phone: {{ state.phone ?? "     ----/----" }}</li>
        <li>Email: {{ state.email ?? "     ----/----" }}</li>
        <li><h4>Social links:</h4></li>
        <li v-for="social in state.Socials" :key="social.id">
          {{ social.title }} : <a :href="social.link"> Link</a>
        </li>
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
    <div class="form_block" v-if="isEnable">
      <div class="form_block__inputs">
        <LazyUiElementsAddPostInput
          label="Copyright"
          width-form="100%"
          font-size="2rem"
          name="copyright"
          placeholder="Input copyright"
          v-model:value.trim="state.copyright" />
        <LazyUiElementsAddPostInput
          label="Adreess"
          width-form="100%"
          font-size="2rem"
          name="adreess"
          placeholder="Input adreess"
          v-model:value.trim="state.adress" />
        <LazyUiElementsAddPostInput
          label="Phone"
          width-form="100%"
          font-size="2rem"
          name="telephone"
          placeholder="Input telephone"
          v-model:value.trim="state.phone" />
        <LazyUiElementsAddPostInput
          label="Email"
          width-form="100%"
          font-size="2rem"
          name="email"
          placeholder="Input email"
          v-model:value.trim="state.email" />
      </div>

      <ul class="social__wrapper">
        <li><h4>Social link</h4></li>
        <li class="social__wrapper__fields">
          <LazyUiElementsAddPostInput
            label="Adreess"
            width-form="100%"
            font-size="2rem"
            name="adreess"
            placeholder="Input adreess"
            v-model:value.trim="socialData.title" />
          <LazyUiElementsAddPostInput
            label="Adreess"
            width-form="100%"
            font-size="2rem"
            name="adreess"
            placeholder="Input adreess"
            v-model:value.trim="socialData.link" />
        </li>
        <li>
          <LazyUiElementsAddButton
            title="Add Link"
            font-size="16px"
            paddings="0.4em"
            style="width: 150px"
            color-bg="dark"
            @click="addLink"
            >Add Link</LazyUiElementsAddButton
          >
        </li>
      </ul>

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

.list_block ul li {
  display: grid;
  grid-template-columns: auto 70px;
  column-gap: 20px;
  align-items: center;
}
.wrapper_block .list_block {
  display: grid;
  row-gap: 30px;
  align-content: start;
  & ul {
    display: grid;
    row-gap: 15px;
    justify-content: start;
  }
}
.wrapper_block .form_block {
  display: grid;

  row-gap: 20px;
  &__inputs {
    display: grid;
    grid-auto-rows: 35px;
    row-gap: 20px;
  }

  & .social__wrapper {
    display: grid;
    row-gap: 24px;
    & h4 {
      text-align: center;
    }
    &__fields {
      display: grid;
      row-gap: 24px;
      grid-auto-rows: 35px;
    }
    & li:last-child {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
