<!-- eslint-disable no-alert -->
<script setup lang="ts">
import { storeToRefs } from "pinia";

const isEnable = ref(false);
const fileList = ref<FileList>();

const { statAuth } = storeToRefs(useAuthStore());
const { signOutUser } = useAuthStore();

const { authorizedUserCredentials } = storeToRefs(useUserStore());
const { updateUserCredentials } = useUserStore();

const onFileSelected = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (fileList.value = fileEvent.files);
};
const submitForm = async () => {
  if (authorizedUserCredentials.value?.id) {
    const result = await updateUserCredentials(fileList.value, authorizedUserCredentials.value);

    alert(result.message);
  } else {
    alert("Profile data is empty");
  }
};

onMounted(() => console.log("Setting Block ", authorizedUserCredentials.value));
</script>

<template>
  <div class="wrapper_block">
    <div class="list_block" v-if="authorizedUserCredentials">
      <h2>My Prodile</h2>
      <ul>
        <li>Email: {{ authorizedUserCredentials.emailField }}</li>
        <li>User name: {{ authorizedUserCredentials.userNameField }}</li>
        <li>First Name : {{ authorizedUserCredentials.firstNameField }}</li>
        <li>Last Name: {{ authorizedUserCredentials.lastNameField }}</li>
        <li>Phone: {{ authorizedUserCredentials.phoneField }}</li>
        <li>Gender: {{ authorizedUserCredentials.genderField }}</li>
        <li>Birthday: {{ authorizedUserCredentials.birthdayField }}</li>
        <li>Adress: {{ authorizedUserCredentials.adressField }}</li>
        <li>Access Panel: {{ authorizedUserCredentials.accessPanel }}</li>
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
    <div class="form_block" v-if="isEnable && authorizedUserCredentials">
      <LazyUiElementsAddPostInput
        label="Email"
        width-form="100%"
        font-size="2rem"
        name="emailField"
        placeholder="Input copyright"
        v-model:value.trim="authorizedUserCredentials.emailField" />
      <LazyUiElementsAddPostInput
        label="User name"
        width-form="100%"
        font-size="2rem"
        name="userNameField"
        placeholder="Input telephone"
        v-model:value.trim="authorizedUserCredentials.userNameField" />
      <LazyUiElementsAddPostInput
        label="First Name"
        width-form="100%"
        font-size="2rem"
        name="firstNameField"
        placeholder="Input email"
        v-model:value.trim="authorizedUserCredentials.firstNameField" />
      <LazyUiElementsAddPostInput
        label="Last Name"
        width-form="100%"
        font-size="2rem"
        name="lastNameField"
        placeholder="Input adreess"
        v-model:value.trim="authorizedUserCredentials.lastNameField" />
      <LazyUiElementsAddPostInput
        label="Phone"
        width-form="100%"
        font-size="2rem"
        name="genderField"
        placeholder="Input fasbook link"
        v-model:value.trim="authorizedUserCredentials.phoneField" />
      <LazyUiElementsAddPostInput
        label="Gender"
        width-form="100%"
        font-size="2rem"
        name="genderField"
        placeholder="Input twetter link"
        v-model:value.trim="authorizedUserCredentials.genderField" />
      <LazyUiElementsAddPostInput
        label="Birthday"
        width-form="100%"
        font-size="2rem"
        name="birthdayField"
        placeholder="Input youtube link"
        v-model:value.trim="authorizedUserCredentials.birthdayField" />
      <LazyUiElementsAddPostInput
        label="Adress"
        width-form="100%"
        font-size="2rem"
        name="adressField"
        placeholder="Input instagramm link"
        v-model:value.trim="authorizedUserCredentials.adressField" />

      <div class="upload">
        <label for="upload">Avatar image upload</label>
        <input type="file" name="upload" @change="onFileSelected" />
      </div>
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
