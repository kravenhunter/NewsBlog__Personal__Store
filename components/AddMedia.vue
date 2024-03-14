<script setup lang="ts">
import type { IPodcast } from "types/IPodcast";

defineProps({
  podcastList: {
    type: Array as PropType<IPodcast[]>,
    default: null,
  },
});
</script>

<template>
  <div class="media_container">
    <div class="media_play">
      <div class="description">
        <h2>Podcasts</h2>
        <span> Lesten our podcast news. Daily, global problem adn funny things. </span>
      </div>
      <UiElementsMusicAqualizer :list="podcastList" :show-list="false" />
    </div>
    <div class="media_sub">
      <MediaSubcsribe />
    </div>
    <div class="media_socials">
      <MediaStayConnect />
    </div>
  </div>
</template>

<style scoped lang="scss">
.media_container {
  display: grid;
  column-gap: 5px;
  justify-content: space-around;
  grid-template-rows: [fristRow] auto;
  grid-template-columns:
    [play] auto
    [subscribe] auto
    [socials] auto;
  @media (max-width: 620px) {
    & .media_play {
      display: none;
    }
  }
  @media (max-width: 620px) {
    & .media_sub,
    .media_socials {
      display: none;
    }
  }
}
.media_play {
  grid-row: fristRow;
  grid-column: play;
  max-width: 571px;
  background-color: var(--color-grey);

  padding: 20px;
  display: grid;
  align-items: center;
  & .description {
    display: grid;
    row-gap: 10px;
    justify-content: center;
    padding: 0px 20px;

    & h2 {
      color: var(--color-violet);
    }
    & span {
      font-size: var(--size-15);
      font-family: var(--font-italic);
    }
  }
}
.media_sub {
  grid-row: fristRow;
  grid-column: subscribe;
  background-color: var(--color-grey);
}
.media_socials {
  grid-row: fristRow;
  grid-column: socials;
  background-color: var(--color-grey);
}

@media screen and (max-width: 1649px) {
  .media_container {
    row-gap: 15px;

    grid-template-columns:
      [play] auto
      [subscribe] auto
      [right-gutter] 1px;
  }
  .media_socials {
    grid-row: secondRow;
    grid-column: play/ right-gutter;
    justify-self: center;
  }
}
@media screen and (max-width: 1067px) {
  .media_container {
    row-gap: 15px;
    grid-template-rows:
      [fristRow] auto
      [secondRow] auto
      [third] auto;
    grid-template-columns: auto;
    justify-content: center;
  }

  .media_sub {
    grid-row: secondRow;
    grid-column: subscribe;
  }
  .media_socials {
    grid-row: third;
  }
}
</style>
