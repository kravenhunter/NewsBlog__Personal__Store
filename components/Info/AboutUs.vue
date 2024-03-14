<script setup lang="ts">
import { storeToRefs } from "pinia";

const { aboutUs } = storeToRefs(useAboutUsStore());
const errorResponse = createError({ statusCode: 201, statusMessage: "Content not added" });
</script>

<template>
  <div class="about_block">
    <h1 class="about_title">About Us</h1>

    <div class="about_content" v-if="aboutUs?.id">
      <div class="about_title">
        <h2>{{ aboutUs.title }}</h2>
      </div>

      <div v-if="aboutUs?.aboutContent" class="about_text" v-html="aboutUs?.aboutContent"></div>
    </div>
    <div v-else class="no_content">
      <LazyErrorResponse :error-event="errorResponse" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.about_block .about_btn {
  display: grid;
  justify-content: start;
}
.about_block {
  display: grid;
  max-width: 800px;
  row-gap: 20px;

  & .about_title {
    justify-self: center;
  }
}

.about_block .about_content {
  display: grid;
  justify-content: start;
  row-gap: 20px;
}
</style>
