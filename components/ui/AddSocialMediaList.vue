<script setup lang="ts">
import type { PropType } from "nuxt/dist/app/compat/capi";
import type { ILinks } from "types/ILinks";

defineProps({
  popelarCategory: {
    type: Array as PropType<ILinks[]>,
    default: () => [],
  },

  isInlineBlock: {
    type: Boolean,
    default: false,
  },
  enableBg: {
    type: Boolean,
    default: false,
  },
  colorIcon: {
    type: String,
    default: "white",
  },
  paddings: {
    type: String,
    default: "0.5rem",
  },
});
</script>

<template>
  <div class="social_block" :class="{ bg_color_icons: enableBg }">
    <ul class="media" :class="isInlineBlock ? 'media_inline' : 'media_grid'">
      <li>
        <NuxtLink to="https://www.facebook.com/">
          <UiElementsAddIcon
            icon-name="ri:facebook-fill"
            :color-icon="colorIcon"
            size-width="24"
            size-heigth="24" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="https://twitter.com/">
          <UiElementsAddIcon
            icon-name="mdi:twitter"
            :color-icon="colorIcon"
            size-width="24"
            size-heigth="24" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="https://www.youtube.com">
          <UiElementsAddIcon
            icon-name="mdi:youtube"
            :color-icon="colorIcon"
            size-width="27"
            size-heigth="27" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="https://instagram.com/">
          <UiElementsAddIcon
            icon-name="mdi:instagram"
            :color-icon="colorIcon"
            size-width="25"
            size-heigth="25" />
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="https://vk.com/">
          <UiElementsAddIcon
            icon-name="simple-line-icons:social-vkontakte"
            :color-icon="colorIcon"
            size-width="27"
            size-heigth="27" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.bg_color_icons {
  & ul {
    & li:nth-child(1),
    li:nth-child(5) {
      background-color: #516eaa;
    }
    & li:nth-child(2) {
      background-color: #29c5f6;
    }
    & li:nth-child(3) {
      background-color: #e14f42;
    }
    & li:nth-child(4) {
      background-color: #aa5185;
    }
  }
}
.social_block {
  width: 100%;
  display: grid;
  align-content: center;
  & ul {
    & li {
      padding: v-bind(paddings);
    }
  }
}
.media_grid {
  display: grid;
  row-gap: 20px;
}
.media_inline {
  display: grid;
  grid-template-columns: repeat(5, 47px);
  column-gap: 20px;
  @media (max-width: 540px) {
    column-gap: 10px;
    justify-content: space-between;
  }
}
</style>
