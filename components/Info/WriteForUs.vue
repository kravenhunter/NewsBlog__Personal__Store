<script setup lang="ts">
const { getPostByName } = useUnionStore();

const wrighForUs = getPostByName("Wright For Us");
const errorResponse = createError({ statusCode: 201, statusMessage: "Content not added" });
</script>

<template>
  <div class="wright_for_us grid_block">
    <h1 class="wright_for_us__title">Write or Us</h1>
    <div class="wright_for_us__content" v-if="wrighForUs.length">
      <div class="wright_for_us__content__title">
        <h2>{{ wrighForUs[0].title }}</h2>
      </div>

      <div class="wright_for_us__content__text" v-html="wrighForUs[0].body"></div>
    </div>
    <div class="no_content">
      <LazyErrorResponse :error-event="errorResponse" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid_block {
  display: grid;
  justify-items: center;
  row-gap: 100px;
}
.wright_for_us .about_btn {
  display: grid;
  justify-content: start;
}
.wright_for_us {
  display: grid;
  width: min(100%, 800px);
  row-gap: 20px;
  &__content {
    &__title {
      justify-self: center;
    }
  }
}
</style>
