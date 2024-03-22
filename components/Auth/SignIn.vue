<script setup lang="ts">
const emit = defineEmits(["closeModalEmit", "gotoLogIn"]);
const formData = reactive({
  userNameField: "",
  emailField: "",
  passwordField: "",
  confirmPasswordField: "",
});

const isLoading = ref(false);

const v$ = validateSignInHelper(formData);
async function submitForm() {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      const { data, error } = await useFetch("/api/auth/register", {
        method: "POST",
        body: {
          email: v$.value.emailField.$model,
          userName: v$.value.userNameField.$model,
          password: v$.value.passwordField.$model,
        },
      });
      if (error.value) {
        throw error.value;
      }
      console.log(data.value);

      setTimeout(() => {
        isLoading.value = false;
        closeHandler();
      }, 1000);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        isLoading.value = false;
      }, 1000);
    }
  } else {
    console.log("password", v$.value.passwordField.$model);
    console.log("confirm", v$.value.confirmPasswordField.$model);
    // eslint-disable-next-line no-alert
    alert("Wrong Data");
  }
}
function closeHandler() {
  emit("closeModalEmit", true);
}
</script>

<template>
  <div class="login_container image">
    <div class="btn_close">
      <UiElementsAddButton
        title="close"
        data-close-button
        font-size="2.5rem"
        paddings="0px"
        @click="closeHandler"
        >&times;</UiElementsAddButton
      >
    </div>
    <div class="welcome">
      <h3>Рагистрация</h3>
      <h4>Создайте свой аккаунт</h4>
    </div>
    <form @submit.prevent="submitForm">
      <UiElementsAddLoginInput
        label="YOUR USERNAME"
        :color-label="true"
        name="userNameField"
        placeholder="Input your user Name"
        v-model:value.trim="v$.userNameField.$model"
        :error="v$.userNameField.$errors" />
      <UiElementsAddLoginInput
        label="YOUR EMAIL"
        :color-label="true"
        name="emailField"
        placeholder="Input your email"
        v-model:value.trim="v$.emailField.$model"
        :error="v$.emailField.$errors" />

      <UiElementsAddLoginInput
        label="Your password"
        :color-label="true"
        name="passwordField"
        placeholder="Please input password"
        v-model:value.trim:="v$.passwordField.$model"
        :error="v$.passwordField.$errors"
        type="password" />

      <UiElementsAddLoginInput
        label="Confirm password"
        :color-label="true"
        name="confirmPasswordField"
        placeholder="Please confirm password"
        v-model:value.trim="v$.confirmPasswordField.$model"
        :error="v$.confirmPasswordField.$errors"
        type="password" />

      <UiElementsAddButton title="SIGN IN" font-size="18px" color-bg="light"
        >SIGN IN</UiElementsAddButton
      >
    </form>
    <div class="goto">
      <UiElementsAddButton title="Go to Log IN" font-size="1rem" @click="$emit('gotoLogIn', true)"
        >&#8669; Go to Log IN</UiElementsAddButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn_close {
  position: absolute;
  top: 10px;
  right: 20px;
}
.welcome {
  display: grid;
  justify-items: center;
  row-gap: 20px;
}

.welcome h3,
h4 {
  font-weight: 400;
}
.login_container .goto {
  color: var(--color-light);
  font-size: 18px;
  display: grid;
  justify-content: center;
}
.login_container {
  color: var(--color-light);
  display: grid;
  justify-content: center;
  row-gap: 50px;
  padding: 40px 0;
  position: relative;
}
.login_container form {
  display: grid;
  grid-auto-rows: 40px;
  row-gap: 65px;
}
.image {
  background-size: cover; /*cover / auto / contain */
  max-width: 500px;
  min-height: 600px;
  background-image: linear-gradient(rgb(62, 54, 131), rgba(62, 54, 131, 0.67), rgb(62 54 131 / 92%)),
    url("/images/login_img.jpg");
}
</style>
