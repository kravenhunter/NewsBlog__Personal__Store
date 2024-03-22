<script setup lang="ts">
import { storeToRefs } from "pinia";

const isEdit = ref(false);

const { aboutUs } = storeToRefs(useUnionStore());
</script>

<template>
  <div class="about_block" v-if="aboutUs">
    <h2>About Us</h2>
    <div class="about_btn">
      <UiElementsAddButton title="Change" color-bg="dark" font-size="16px" @click="isEdit = !isEdit"
        >Change</UiElementsAddButton
      >
    </div>

    <LazyGuardAboutusEditAbout v-if="isEdit" />

    <div class="about_content" v-if="!isEdit && aboutUs">
      <div class="about_title">
        <h2>{{ aboutUs[0].title }}</h2>
      </div>

      <div class="about_text" v-html="aboutUs[0].description"></div>
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
}

.about_block .about_content {
  display: grid;
  justify-content: start;
  row-gap: 20px;
}
</style>
