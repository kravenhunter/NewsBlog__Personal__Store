<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  iconName: {
    type: String,
    default: "carbon:play-filled",
  },
  value: {
    type: String,
    default: "",
  },
  colorIcon: {
    type: String,
    default: "black",
  },
  sizeWidth: {
    type: String,
    default: "32",
  },
  sizeHeigth: {
    type: String,
    default: "32",
  },
  turnX: {
    type: Boolean,
    default: false,
  },
  turnY: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Icon
    :icon="iconName"
    :color="colorIcon"
    :width="sizeWidth"
    :height="sizeHeigth"
    :horizontal-flip="turnX"
    :vertical-flip="turnY" />
</template>

<style scoped></style>
