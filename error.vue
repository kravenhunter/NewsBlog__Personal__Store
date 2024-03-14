<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

// defineProps(["error"]);
const props = defineProps<{ error: NuxtError }>();
const errNuxt = toRef(props.error);

errNuxt.value.statusMessage = "The Page not found";
const errorHandler = async () => {
  await clearError({ redirect: "/" });
};
</script>

<template>
  <div class="error_container">
    <ErrorResponse :error-event="errNuxt" :use-slot="true">
      <UiElementsAddButton
        title="Back"
        color-bg="dark"
        font-size="1rem"
        :show-slot="true"
        @click="errorHandler"
        >GO BACK</UiElementsAddButton
      ></ErrorResponse
    >
  </div>
</template>

<style scoped lang="scss">
.error_container {
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  align-content: center;
  height: 100vh;
}

.error_wrapper {
  max-width: 460px;
  max-height: 500px;
  margin: 0 auto;
  padding: 50px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: grid;
  justify-items: center;
  row-gap: 30px;
  & .text_message {
    /*     white-space: pre-line; */
    /*    word-wrap: break-word; /* All browsers since IE 5.5+ */
    /*     overflow-wrap:  break-word;
    hyphens: auto; */

    /*   word-wrap: break-word;
    overflow-wrap: break-word;
    hyphens: auto; */
    /*  white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; */
    /*     display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden; */
    /* overflow-x: auto; */
  }
}
h1 {
  font-size: 4rem;
}
h2 {
  font-size: 2rem;
}
</style>
