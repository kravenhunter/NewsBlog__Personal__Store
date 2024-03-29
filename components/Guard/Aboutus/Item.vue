<script setup lang="ts">
import { storeToRefs } from "pinia";

const { aboutUs } = storeToRefs(useUnionStore());
const isEdit = ref(false);
</script>

<template>
  <div class="about_block">
    <h2>About Us</h2>
    <div class="about_btn">
      <UiElementsAddButton title="Change" color-bg="dark" font-size="16px" @click="isEdit = !isEdit"
        >Change</UiElementsAddButton
      >
    </div>

    <LazyGuardAboutusEdit v-if="isEdit" :about="aboutUs[0]" />

    <div class="about_content" v-if="!isEdit && aboutUs.length">
      <div class="about_title">
        <h2>{{ aboutUs[0]?.title }}</h2>
      </div>

      <div class="about_text" v-if="aboutUs[0]?.description" v-html="aboutUs[0].description"></div>
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
