<template>
  <div class="stay_connected">
    <div class="description">
      <h2>Stay Connected</h2>
      <p>We in the social media. Join to our community</p>
    </div>
    <div class="media">
      <div class="facebook social">
        <NuxtLink to="https://www.facebook.com/">
          <UiElementsAddIcon
            icon-name="ri:facebook-fill"
            color-icon="white"
            size-width="24"
            size-heigth="24" />
        </NuxtLink>

        <h4>16,985</h4>
        <p>Fans</p>
      </div>
      <div class="twitter social">
        <NuxtLink to="https://twitter.com/">
          <UiElementsAddIcon
            icon-name="mdi:twitter"
            color-icon="white"
            size-width="24"
            size-heigth="24" />
        </NuxtLink>

        <h4>16,985</h4>
        <p>Follovers</p>
      </div>
      <div class="youtube social">
        <NuxtLink to="https://www.youtube.com">
          <UiElementsAddIcon
            icon-name="mdi:youtube"
            color-icon="white"
            size-width="27"
            size-heigth="27" />
        </NuxtLink>

        <h4>16,985</h4>
        <p>Subscribers</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/sizeMixin.scss";
.social {
  text-align: center;
  padding-top: 10px;
}

.media {
  font-size: var(--size-14);
  color: var(--color-light);
}
.stay_connected {
  padding: 20px 45px;
  display: grid;
  align-content: space-between;
  row-gap: 20px;
  width: 571px;
  height: 100%;
  & .description {
    display: grid;
    row-gap: 20px;

    & h2 {
      color: var(--color-violet);
    }
    & p {
      font-size: var(--size-15);
      font-family: var(--font-italic);
    }
    & h4 {
      @include adaptive("font-size", 15, 16, 0);
    }
    & p {
      @include adaptive("font-size", 18, 14, 0);
    }
  }
  @media (max-width: 1280px) {
    & h4 {
      @include adaptive("font-size", 15, 15, 0);
    }
    & p {
      @include adaptive("font-size", 15, 16, 0);
    }
  }
}

.stay_connected .media {
  display: grid;
  grid-template-columns: repeat(3, 135px);
  grid-template-rows: 87px;
  justify-content: space-between;
}
.media .facebook {
  background-color: var(--color-darkBlue);
}
.media .twitter {
  background-color: var(--color-azule);
}
.media .youtube {
  background-color: var(--color-red);
}
</style>
