<script setup lang="ts">
defineProps({
  slideName: {
    type: String,
    default: "slide-up",
  },

  duration: {
    type: String,
    default: "0.5s",
  },
  sizeContainer: {
    type: String,
    default: "150px",
  },
});
</script>

<template>
  <div class="transition_container">
    <div class="absolute">
      <Transition :name="slideName" mode="out-in">
        <slot />
      </Transition>
    </div>
  </div>
</template>

<style>
.transition_container {
  position: relative;
  /* height: v-bind(containerHeigth); */
  width: v-bind(sizeContainer);
}

.absolute {
  position: absolute;
  top: 0;
  right: 0;
}
/* slide-up section */
.slide-up-enter-active {
  transition: all v-bind(duration);
}

.slide-up-leave-active {
  transition: all v-bind(duration);
}
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

/* slide-up section */
.slide-left-enter-active {
  transition: all v-bind(duration);
}

.slide-left-leave-active {
  transition: all v-bind(duration);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

/* fade section */

.fade-leave-active {
  transition: opacity v-bind(duration) ease;
}
.fade-enter-active {
  transition: opacity v-bind(duration) ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
