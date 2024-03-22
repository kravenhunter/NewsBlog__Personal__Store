<!-- eslint-disable no-alert -->
<script setup lang="ts">
import type { IUserCredentials } from "~/types";

const isEnable = ref(false);
const fileAvatar = ref<File>();

//const { statAuth } = storeToRefs();
const { createOrUpdateData } = useUnionStore();

const { data } = useAuth();

const { getAuthUserByName } = useUnionStore();
const userCredentials = ref<IUserCredentials>();

data?.value?.user && (userCredentials.value = getAuthUserByName(data.value.user.name!));

const state = reactive({
  emailField: userCredentials.value?.emailField ?? "",
  userNameField: userCredentials.value?.userNameField ?? "",
  firstNameField: userCredentials.value?.firstNameField ?? "",
  lastNameField: userCredentials.value?.lastNameField ?? "",
  phoneField: userCredentials.value?.phoneField ?? "",
  genderField: userCredentials.value?.genderField ?? "",
  birthdayField: userCredentials.value?.birthdayField ?? "",
  adressField: userCredentials.value?.adressField ?? "",
  accessPanel: userCredentials.value?.accessPanel ?? false,
  date: userCredentials.value?.date ?? Date.now(),
});
const onFileSelected = async (event: Event) => {
  const fileEvent = event.target as HTMLInputElement;
  fileEvent.files?.length && (fileAvatar.value = fileEvent.files[0]);
};

const submitForm = async () => {
  if (userCredentials.value?.id) {
    const body = new FormData();

    fileAvatar.value && body.append("file", fileAvatar.value, fileAvatar.value.name);

    for (const item in state) {
      body.append(item, `${state[item as keyof typeof state]}`);
    }
    const result = await createOrUpdateData("auth/update-credentials", body);

    result && result.statusCode === 200 && alert(result.statusMessage);
  } else {
    alert("Profile data is empty");
  }
};

// onMounted(() => console.log("Setting Block ", authorizedUserCredentials.value));
</script>

<template>
  <div class="wrapper_block">
    <div class="list_block">
      <h2>My Prodile</h2>
      <ul>
        <li>Email: {{ state.emailField }}</li>
        <li>User name: {{ state.userNameField }}</li>
        <li>First Name : {{ state.firstNameField }}</li>
        <li>Last Name: {{ state.lastNameField }}</li>
        <li>Phone: {{ state.phoneField }}</li>
        <li>Gender: {{ state.genderField }}</li>
        <li>Birthday: {{ state.birthdayField }}</li>
        <li>Adress: {{ state.adressField }}</li>
        <li>Access Panel: {{ state.accessPanel }}</li>
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
      <LazyUiElementsAddPostInput
        label="Email"
        width-form="100%"
        font-size="2rem"
        name="emailField"
        placeholder="Input copyright"
        v-model:value.trim="state.emailField" />
      <LazyUiElementsAddPostInput
        label="User name"
        width-form="100%"
        font-size="2rem"
        name="userNameField"
        placeholder="Input telephone"
        v-model:value.trim="state.userNameField" />
      <LazyUiElementsAddPostInput
        label="First Name"
        width-form="100%"
        font-size="2rem"
        name="firstNameField"
        placeholder="Input email"
        v-model:value.trim="state.firstNameField" />
      <LazyUiElementsAddPostInput
        label="Last Name"
        width-form="100%"
        font-size="2rem"
        name="lastNameField"
        placeholder="Input adreess"
        v-model:value.trim="state.lastNameField" />
      <LazyUiElementsAddPostInput
        label="Phone"
        width-form="100%"
        font-size="2rem"
        name="genderField"
        placeholder="Input fasbook link"
        v-model:value.trim="state.phoneField" />
      <LazyUiElementsAddPostInput
        label="Gender"
        width-form="100%"
        font-size="2rem"
        name="genderField"
        placeholder="Input twetter link"
        v-model:value.trim="state.genderField" />
      <LazyUiElementsAddPostInput
        label="Birthday"
        width-form="100%"
        font-size="2rem"
        name="birthdayField"
        placeholder="Input youtube link"
        v-model:value.trim="state.birthdayField" />
      <LazyUiElementsAddPostInput
        label="Adress"
        width-form="100%"
        font-size="2rem"
        name="adressField"
        placeholder="Input instagramm link"
        v-model:value.trim="state.adressField" />

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
