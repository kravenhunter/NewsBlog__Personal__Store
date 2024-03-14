<template>
  <div class="header_middle">
    <ul class="weather">
      <li>
        <UiElementsAddIcon icon-name="tabler:sun-filled" size-width="27" size-heigth="27" />
      </li>
      <li>22.8</li>
      <li>c</li>
      <li>Match</li>
    </ul>
    <div class="logo">
      <h1 class="title">WORLD IMPULS</h1>
      <span class="date">Tusday, June 23, 2020</span>
    </div>
    <div class="media_block">
      <ul class="media">
        <li>
          <NuxtLink to="https://www.facebook.com/">
            <UiElementsAddIcon icon-name="ri:facebook-fill" size-width="25" size-heigth="25" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://twitter.com/">
            <UiElementsAddIcon icon-name="mdi:twitter" size-width="25" size-heigth="25" />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="https://www.youtube.com">
            <UiElementsAddIcon icon-name="mdi:youtube" size-width="25" size-heigth="25" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/sizeMixin.scss";
.header_middle {
  display: grid;
  grid-template-columns: 2fr auto 2fr;
  padding: 20px;
  column-gap: 20px;
  margin-bottom: 10px;
}
.header_middle {
  & .media_block {
    padding-right: 20px;
    display: grid;
    align-content: center;
    justify-self: end;
    @media (max-width: 1350px) {
      max-width: 100%;
    }
  }
}
.header_middle .weather,
.media {
  display: flex;
  align-items: center;
  @media (max-width: 900px) {
    display: none;
  }
}
.header_middle .weather {
  column-gap: 5px;
}
.header_middle .media {
  justify-self: end;
  max-width: 200px;
  position: relative;

  column-gap: 25px;
  @media (max-width: 1350px) {
    justify-self: center;
    max-width: 100%;
  }
  /*  & .search_block {
    & .search_input {
      position: absolute;
      max-width: 50rem;
      top: 0;
      right: 110%;
      padding: 10px 5px 5px 5px;
      height: 100%;
      overflow: hidden;
      transition: max-width 1s ease;
      &.search_close {
        max-width: 0;
        padding: 10px 0px 0px 0px;
        transition: max-width 0.3s ease;
      }
    }
    @media (max-width: 1662px) {
      opacity: 0;
    }
  } */
}
.header_middle .logo {
  display: grid;
  justify-content: center;
  @media (max-width: 900px) {
    //для работы микина нужно файл  подключить в конфиге

    grid-column: 1/ -1;
  }
}
.header_middle .logo .title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 15px;

  @media (max-width: 1200px) {
    //для работы микина нужно файл  подключить в конфиге
    @include adaptive("font-size", 64, 50, 0);
  }
}
.header_middle .logo .date {
  text-align: center;
  font-weight: 200;
  line-height: normal;
}
</style>
