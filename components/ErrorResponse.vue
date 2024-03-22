<script setup lang="ts">
import type { NuxtError } from "nuxt/app";
import type { IError } from "~/types";

interface IProps {
  errorEvent?: NuxtError;
  titleResult?: string;
  useSlot?: boolean;
  showStatusCode?: boolean;
  customEvent?: IError;
  status?: number;
  errorMessage?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  titleResult: "Ooops.",
  useSlot: false,
  showStatusCode: true,
  status: 404,
  errorMessage: "No results",
});

// const props = defineProps({
//   errorEvent: {
//     type: Object as PropType<NuxtError>,
//     default: null,
//   },

//   titleResult: {
//     type: String,
//     default: "Ooops.",
//   },
//   useSlot: {
//     type: Boolean,
//     default: false,
//   },
//   showStatusCode: {
//     type: Boolean,
//     default: true,
//   },
//   customEvent: {
//     type: Object as PropType<IError>,
//     default: null,
//   },

//   status: {
//     type: Number,
//     default: 404,
//   },
//   errorMessage: {
//     type: String,
//     default: "No results",
//   },
// });

useHead({
  title: "Error response",
  meta: [{ name: "Error", content: props.errorMessage }],
});
</script>

<template>
  <div class="error_wrapper" v-if="errorEvent">
    <h1 v-if="showStatusCode">{{ errorEvent.statusCode }}</h1>
    <h2>{{ titleResult }}</h2>
    <div class="errormessage" v-if="errorEvent.statusMessage">
      <h3>{{ errorEvent.statusMessage }}</h3>
    </div>
    <slot v-if="useSlot" />
    <UiElementsAddLink v-else color-bg="dark" font-size="1rem" size="115px"
      >GO BACK</UiElementsAddLink
    >
  </div>
</template>

<style scoped lang="scss">
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

  & h1 {
    font-size: 4rem;
  }
  & h2 {
    font-size: 2rem;
  }
}
</style>
