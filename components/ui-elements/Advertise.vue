<script setup lang="ts">
import type { IGalaryCard } from "types/IGalaryCard";

defineProps({
  label: {
    type: String,
    default: "",
  },
  link: {
    type: Object as PropType<IGalaryCard>,
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
      <img class="advertise_image" v-if="link" :src="link.source" :alt="link.name" />
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
