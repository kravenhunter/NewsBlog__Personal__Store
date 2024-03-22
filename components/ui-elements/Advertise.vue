<script setup lang="ts">
import type { IAdvertisment } from "~/types";

defineProps({
  label: {
    type: String,
    default: "",
  },
  link: {
    type: Object as PropType<IAdvertisment>,
    default: null,
  },
});
</script>

<template>
  <div class="wrapper">
    <div class="label">
      <h5 v-if="label">{{ label }}</h5>
    </div>
    <div class="advertise">
      <NuxtImg
        v-if="link.source"
        :src="`data:image/webp;base64,${link.source.file_binary}`"
        :alt="link.name" />
    </div>
  </div>
</template>

<style scoped>
.advertise {
  height: 220px;
  width: 100%;
}
.advertise .advertise_image {
  object-fit: cover;
  object-position: top center;
  width: 100%;
}
.label {
  display: flex;
  justify-content: center;
}
</style>
