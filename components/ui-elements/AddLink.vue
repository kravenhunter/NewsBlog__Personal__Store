<script setup lang="ts">
defineProps({
  label: {
    type: String,
    default: "Label",
  },
  size: {
    type: String,
    default: "100%",
  },
  fontSize: {
    type: String,
    default: "10px",
  },
  colorBg: {
    type: String,
    default: "",
  },
  paddings: {
    type: String,
    default: "1em",
  },

  colorText: {
    type: String,
    default: "#fff",
  },

  toPath: {
    type: String,
    default: "/",
  },
});
</script>

<template>
  <NuxtLink
    class="btn"
    :class="{
      btn_light: colorBg === 'light',
      btn_dark: colorBg === 'dark',
      btn_darkBlue: colorBg === 'darkBlue',
    }"
    :to="toPath">
    <slot />
  </NuxtLink>
</template>

<style scoped lang="scss">
.btn {
  font-size: v-bind(fontSize);
  font-weight: 600;
  padding: v-bind(paddings);
  background-color: transparent;
  color: v-bind(colorText);
  cursor: pointer;
  width: v-bind(size);
  &:hover {
    background-color: var(--color-light-hover);
    color: var(--color-dark);
  }
  &.btn_light {
    background-color: var(--color-light);

    color: var(--color-dark);
    &:hover {
      background-color: var(--color-grey);
      color: var(--color-dark);
    }
  }
  &.btn_dark {
    background-color: var(--color-dark);

    &:hover {
      color: var(--color-light);
      background-color: var(--color-darkLight-hover);
      border: 1px solid var(--color-orange);
    }
  }
  &.btn_darkBlue {
    background-color: var(--color-darkBlue);
  }
}
</style>
