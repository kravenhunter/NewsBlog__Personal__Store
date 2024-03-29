<script setup lang="ts">
async function submitForm() {
  try {
    const { data, error } = await useFetch("/api/post/list");
    console.log(data.value);
    console.log(error.value);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
</script>

<template>
  <div class="login_container image grid_center">
    <div class="btn_close">
      <UiElementsAddButton title="close" data-close-button font-size="2.5rem" paddings="0px"
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
        placeholder="Input your email" />

      <UiElementsAddLoginInput
        label="Your password"
        :color-label="true"
        name="passwordField"
        placeholder="Please input password"
        type="password" />

      <UiElementsAddButton title="Log In" font-size="16px" color-bg="light"
        >Log In</UiElementsAddButton
      >
    </form>
  </div>
</template>

<style lang="scss" scoped>
.btn_close {
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
    url("/images/login_img.jpg");
}
</style>
