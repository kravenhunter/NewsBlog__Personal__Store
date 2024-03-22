<script setup lang="ts">
const { getPostByName } = useUnionStore();

const inThePress = getPostByName("In The Press");
const errorResponse = createError({ statusCode: 201, statusMessage: "Content not added" });
</script>

<template>
  <div class="in_the_press grid_block">
    <h1>In The Press</h1>
    <div class="in_the_press_content" v-if="inThePress.length">
      <div class="in_the_press__content__title">
        <h2>{{ inThePress[0].title }}</h2>
      </div>

      <div class="in_the_press_content__text" v-html="inThePress[0].body"></div>
    </div>
    <div class="no_content" v-else>
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
.in_the_press .about_btn {
  display: grid;
  justify-content: start;
}
.in_the_press {
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
