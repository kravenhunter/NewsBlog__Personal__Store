<script setup lang="ts">
import type { ICategory, IContacts, INavigation, IPost } from "~/types";

interface IProps {
  categories?: ICategory[] | null;
  contacts?: IContacts[] | null;
  aboutUsLinks?: INavigation[];
  favorites?: IPost[] | null;
}
defineProps<IProps>();

// function getRandomPost(state: IArticle[]) {
//   const min = state.length / state.length;
//   const max = state.length;
//   const rendom = Math.floor(Math.random() * (max - min) + min);
//   return state[rendom - 1];
// }
// function getRandomRang(state: IArticle[], num: number) {
//   const min = state.length / state.length;
//   const max = state.length - num;
//   const rendom = Math.floor(Math.random() * (max - min) + min);
//   return state.slice(rendom, rendom + num);
// }
</script>

<template>
  <div class="footer_container">
    <img class="footer_image" src="/images/footer.jpg" alt="footer" />
    <div class="content">
      <div class="media_block grid_block">
        <h2 class="media_block_title">WORLD IMPELSE</h2>
        <p>{{ contacts?.length && contacts[0].copyright }}</p>
        <UiAddSocialMediaList :is-inline-block="true" />
      </div>
      <div class="about_block grid_block">
        <h2 class="title_block">About Us</h2>
        <UiAddAboutLinks direction="flex" gaps="20px" :aboutlinks="aboutUsLinks" />
      </div>
      <div class="popular_block grid_block">
        <h2 class="title_block">Popular Category</h2>
        <UiAddAboutLinks direction="grid" gaps="20px" :categorylinks="categories?.slice(1)" />
      </div>
      <div class="editor_picks grid_block">
        <h2 class="title_block">Editor Piks</h2>

        <ArticleSingleArticle
          class-type="image_content_rigth"
          :show-title="true"
          :show-image="true"
          font-size="16px"
          :font-weight="400"
          v-for="fav in favorites"
          :key="fav.id"
          :single-post="fav" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer_container {
  position: relative;
  display: grid;
  margin-top: 50px;
  height: 520px;
  overflow-y: hidden;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 900px) {
    height: auto;
  }
}
.media_block .media_block_title {
  font-size: 2rem;
}
.title_block {
  color: var(--color-orange);
  font-size: 1.5rem;
}
.footer_container .media {
  display: flex;
  align-items: center;
  column-gap: 20px;
  color: var(--color-light);
  @media (max-width: 900px) {
    display: none;
  }
}
.grid_block {
  display: grid;
  row-gap: 20px;
  justify-content: center;
  align-content: center;
}

.footer_container .content {
  color: var(--color-light);
  background-color: rgba(0, 0, 0, 0.7);

  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-content: center;
  align-items: start;
  justify-content: space-between;
  column-gap: 20px;
  padding: 20px 100px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
    padding: 20px 80px;
    & .editor_picks {
      display: none;
    }
  }
  @media (max-width: 951px) {
    padding: 20px 50px;
    grid-template-columns: repeat(2, 1fr);
    & .media_block {
      display: none;
    }
  }
  @media (max-width: 780px) {
    grid-template-columns: repeat(2, 1fr);
    & .media_block {
      display: none;
    }
  }

  @media (max-width: 560px) {
    padding: 20p;
    grid-template-columns: auto;
    justify-content: center;
    & .media_block {
      display: block;
    }
    & .about_block {
      display: none;
    }
    & .popular_block {
      display: none;
    }
  }
}
.footer_container .footer_image {
  grid-column: span 4;
  grid-row: span 2;
  object-fit: cover;

  width: 100%;
}
</style>
