<script setup lang="ts">
const emit = defineEmits(["closeModalEmit", "gotoSignIn"]);
const formData = reactive({
  emailField: "admin@ya.ru",
  passwordField: "p@ssw0rd",
});

const { signIn } = useAuth();

const isLoading = ref(false);
const v$ = validateLoginHelper(formData);
async function submitForm() {
  v$.value.$validate();
  if (!v$.value.$error) {
    try {
      isLoading.value = true;
      setTimeout(async () => {
        const result = await signIn("credentials", {
          email: v$.value.emailField.$model,
          password: v$.value.passwordField.$model,
          redirect: false,
        });
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
    // console.log(v$.value.$errors[0]);
    console.log("password", v$.value.passwordField.$model);
    // eslint-disable-next-line no-alert
    alert("not  submit!");
  }
}

function closeHandler() {
  emit("closeModalEmit", true);
}
</script>

<template>
  <div class="login_container image grid_center">
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
    <div class="welcome grid_center">
      <h3>Авторизация</h3>
    </div>
    <form @submit.prevent="submitForm">
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

      <UiElementsAddButton title="Log In" font-size="16px" color-bg="light"
        >Log In</UiElementsAddButton
      >
    </form>
    <div class="goto grid_center">
      <UiElementsAddButton
        title="Go to SignIn IN"
        font-size="1rem"
        @click="$emit('gotoSignIn', true)"
        >&#8669; Go to SignIn IN</UiElementsAddButton
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn_close {
  font-size: 2.5rem;
  position: absolute;
  top: 10px;
  right: 20px;
}
.welcome {
  row-gap: 20px;
}

.welcome h3,
h4 {
  font-weight: 400;
}
.grid_center {
  display: grid;
  justify-content: center;
}
.login_container .goto {
  color: var(--color-light);
  font-size: 18px;
}
.login_container {
  color: var(--color-light);
  row-gap: 20px;
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
    url("/images/login_img.webp");
}
</style>
