<script setup lang="ts">
const errorResponse = createError({ statusCode: 201, statusMessage: "Content not added" });
</script>

<template>
  <div class="in_the_press_block grid_block">
    <h1>In The Press</h1>
    <div class="no_content">
      <LazyErrorResponse :error-event="errorResponse" />
    </div>
  </div>
</template>

<style scoped>
.grid_block {
  display: grid;
  justify-items: center;
  row-gap: 100px;
}
</style>
