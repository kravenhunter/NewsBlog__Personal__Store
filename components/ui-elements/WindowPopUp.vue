<script setup lang="ts">
defineProps<{ isShow: boolean }>();
</script>

<template>
  <div class="window_popup" id="modal_widow" :class="{ active: isShow }">
    <slot />
  </div>
  <div id="pop_up" :class="{ active: isShow }"></div>
</template>

<style scoped lang="scss">
/*Modal Window  */

#pop_up {
  position: fixed;
  transition: 0.2s ease-in-out;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
}
#pop_up.active {
  opacity: 1;
  pointer-events: all;
}
.window_popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 0.2s ease-in-out;
  border: 1px solid black;
  z-index: 10;
  background-color: white;
  border-radius: 10px;
  max-width: 80%;
}

.window_popup.active {
  transform: translate(-50%, -50%) scale(1);
}
</style>
