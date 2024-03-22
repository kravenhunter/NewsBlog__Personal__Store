<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "Label",
  },
  size: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  fontSize: {
    type: String,
    default: "10px",
  },
  colorBg: {
    type: String,
    default: "transparent",
  },
  paddings: {
    type: String,
    default: "0.5em 1em",
  },

  colorText: {
    type: String,
    default: "#fff",
  },
  setTarget: {
    type: String,
    default: "",
  },
  typeBtn: {
    type: Boolean,
    default: true,
  },
  // disabled: {
  //   type: Boolean,
  //   default: false,
  // },
});
</script>

<template>
  <button
    v-bind="$attrs"
    :title="title"
    class="btn"
    :class="{
      btn_transperent: colorBg === 'transparent',
      btn_light: colorBg === 'light',
      btn_dark: colorBg === 'dark',
      btn_darkBlue: colorBg === 'darkBlue',
    }"
    :data-set-target="setTarget">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  /*  font-size: v-bind(fontSize); */
  font-weight: 600;
  padding: v-bind(paddings);

  color: v-bind(colorText);
  cursor: pointer;
  width: v-bind(size);
}
.btn_transperent {
  background-color: transparent;
}
.btn_light {
  background-color: var(--color-light);
  color: var(--color-dark);
}
.btn_light:hover {
  background-color: var(--color-light-hover);
}

.btn_dark {
  background-color: var(--color-dark);
  color: var(--color-light);
}
.btn_dark:hover {
  background-color: var(--color-darkLight-hover);
  border: 1px solid var(--color-orange);
}

.btn_darkBlue {
  background-color: var(--color-darkBlue);
}
.btn_darkBlue:hover {
  background-color: var(--color-darkBlue-hover);
}
</style>
