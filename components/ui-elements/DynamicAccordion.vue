<script setup lang="ts">
defineProps({
  maxWidth: {
    type: String,
    default: "100%",
  },
  accordPosotion: {
    type: String,
    default: "absolute",
  },
  paddings: {
    type: String,
    default: "0px",
  },
  isOpenAccord: {
    type: Boolean,
    default: true,
  },
  overFlow: {
    type: String,
    default: "auto",
  },
  bdColor: {
    type: String,
    default: "black",
  },
  colorText: {
    type: String,
    default: "white",
  },
  maxHeight: {
    type: String,
    default: "10em",
  },
});
</script>

<template>
  <div class="content_wrapper">
    <div class="accordion_content" :class="!isOpenAccord && 'accordion_is_closed'">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content_wrapper {
  width: v-bind(maxWidth);
  position: relative;
}

.accordion {
  &_content {
    position: v-bind(accordPosotion);
    width: 100vw;
    top: 0;
    padding: v-bind(paddings);
    /*  padding: 0em 1.2em; */
    max-height: v-bind(maxHeight);
    overflow: v-bind(overFlow);
    transition: all 0.5s ease;
    background-color: v-bind(bdColor);
    color: v-bind(colorText);
  }
  &_is_closed {
    max-height: 0;
  }
}
</style>
