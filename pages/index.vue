<script setup lang="ts">
import { storeToRefs } from "pinia";

//Fetch Podcast List
const { podcastsState } = storeToRefs(usePodcastsStore());

//Fetch Articles data
const { postsState } = storeToRefs(useArticleStore());

//Fetch Advertisement galary
const { advertiseList } = storeToRefs(useAdvertiseStore());

/* function getRandomPost(state: IArticle[]) {
  const min = state.length / state.length;
  const max = state.length;
  const rendom = Math.floor(Math.random() * (max - min) + min);
  return state[rendom - 1];
} */
/* function getRandomRang(state: IArticle[], num: number) {
  const min = state.length / state.length;
  const max = state.length - num;
  const rendom = Math.floor(Math.random() * (max - min) + min);
  return state.slice(rendom, rendom + num);
} */

useSeoMeta({
  title: "MAIN NEWS",
  ogTitle: "MAIN NEWS",
});
</script>

<template>
  <section class="main_wrapper">
    <section v-if="postsState.postList.length" class="main">
      <section class="section_preview">
        <ArticleSingleArticle
          class-type="image_content_middle"
          :single-post="postsState.favoriteList[0]"
          font-size="30px"
          row-size="700px"
          :show-title="true"
          :show-category="true"
          :show-image="true"
          :show-short-body="true"
          :show-date="true" />
        <div class="random_news bars">
          <ArticleSingleArticle
            class-type="image_content_top"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            v-for="(el, i) in postsState.worldList.slice(2, 5)"
            :key="i"
            :single-post="el" />
        </div>

        <div class="bars favorite">
          <h3>Editor Pick</h3>

          <ArticleSingleArticle
            class-type="image_content_rigth"
            :single-post="postsState.favoriteList[4]"
            :show-title="true"
            :show-image="true"
            :show-date="true" />

          <div class="bars busines">
            <h3>Busines</h3>
            <ArticleSingleArticle
              class-type="image_content_rigth"
              :show-title="true"
              :show-image="true"
              :show-date="true"
              v-for="(el, i) in postsState.businessList.slice(2, 5)"
              :key="i"
              :single-post="el" />
          </div>
          <LazyUiElementsAdvertise
            v-if="advertiseList.databaseList.length"
            label="Advertisement"
            :link="advertiseList.databaseList[0]" />
        </div>
      </section>

      <section class="section_media">
        <LazyAddMedia :podcast-list="podcastsState.podcastList" />
      </section>

      <section class="section_policy">
        <div class="bars magazine">
          <h3>World</h3>
          <ArticleSingleArticle
            class-type="title_content"
            :show-title="true"
            :show-date="true"
            v-for="(el, i) in postsState.worldList.slice(3, 7)"
            :key="i"
            :single-post="el" />
        </div>

        <div class="politics bars">
          <h3>Politics</h3>
          <ArticleSingleArticle
            class-type="image_content_left"
            :show-image="true"
            :show-title="true"
            :show-short-body="true"
            :show-date="true"
            v-for="(el, i) in postsState.policyList.slice(0, 5)"
            :key="i"
            :single-post="el" />
        </div>

        <div class="bars busines">
          <h3>Busines</h3>
          <ArticleSingleArticle
            class-type="image_content_rigth"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            v-for="(el, i) in postsState.businessList.slice(3, 6)"
            :key="i"
            :single-post="el" />
        </div>
      </section>

      <section class="section_must_read">
        <div class="top">
          <h1 class="title">MUST READ</h1>
          <h5 class="text">
            Everything you need to know about the re-reboot of your favourite childhood flick.
          </h5>
        </div>
        <div class="must_read_main">
          <ArticleSingleArticle
            class-type="image_content_top"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            row-size="700px"
            font-size="30px"
            :single-post="postsState.favoriteList[1]" />
        </div>
        <div class="must_read_list bars">
          <ArticleSingleArticle
            class-type="image_content_top"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            v-for="(el, i) in postsState.businessList.slice(0, 4)"
            :key="i"
            :single-post="el" />
        </div>
      </section>

      <LazyUiElementsAdvertise
        v-if="advertiseList.databaseList.length"
        :link="advertiseList.databaseList[1]" />

      <section class="style_container">
        <div class="art bars">
          <h3>Art</h3>

          <ArticleSingleArticle
            class-type="image_content_top"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            v-for="(el, i) in postsState.artList.slice(0, 3)"
            :key="i"
            :single-post="el" />
        </div>
        <div class="culture_block bars">
          <ArticleSingleArticle
            class-type="image_content_top"
            :show-category="true"
            :show-title="true"
            :show-image="true"
            :show-date="true"
            row-size="700px"
            font-size="40px"
            :single-post="postsState.culture[1]" />

          <div class="culture_list bars">
            <h3>Culture</h3>
            <ArticleSingleArticle
              class-type="image_content_left"
              :show-image="true"
              :show-title="true"
              :show-short-body="true"
              :show-date="true"
              v-for="(el, i) in postsState.culture.slice(0, 3)"
              :key="i"
              :single-post="el" />
          </div>
        </div>
        <div class="style_block bars">
          <div class="bars busines">
            <h3>Style</h3>
            <ArticleSingleArticle
              class-type="image_content_rigth"
              :show-title="true"
              :show-image="true"
              :show-date="true"
              v-for="(el, i) in postsState.styleList.slice(0, 3)"
              :key="i"
              :single-post="el" />
          </div>
          <LazyUiElementsAdvertise
            label="Advertisement"
            v-if="advertiseList.databaseList.length"
            :link="advertiseList.databaseList[1]" />

          <div class="bars busines">
            <h3>Latest News</h3>
            <ArticleSingleArticle
              class-type="image_content_rigth"
              :show-title="true"
              :show-image="true"
              :show-date="true"
              v-for="(el, i) in postsState.policyList.slice(0, 3)"
              :key="i"
              :single-post="el" />
          </div>
        </div>
      </section>
    </section>
    <section v-else class="empty"></section>
  </section>
</template>

<style scoped lang="scss">
.empty {
  height: 100%;
}
.section_preview {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  justify-content: space-around;
  gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    grid-template-columns: 2fr 1fr;
  }
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  & .favorite {
    @media (max-width: 1200px) {
      display: none;
    }
  }
  & .random_news {
    @media (max-width: 900px) {
      display: none;
    }
  }
}

.section_policy {
  display: grid;

  grid-template-columns: 0.6fr 2fr 0.9fr;
  justify-content: space-around;
  justify-items: center;
  gap: 20px;

  @media (max-width: 1400px) {
    grid-template-columns: 2fr 1fr;
    & .magazine {
      display: none;
    }
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    & .busines {
      display: none;
    }
  }
  @media (max-width: 780px) {
    & .politics {
      grid-auto-rows: auto;
      gap: 40px;
    }
  }
}

.bars {
  display: grid;
  align-content: start;
  row-gap: 20px;
}

.politics {
  grid-template-rows: auto;
  grid-auto-rows: 250px;

  overflow: hidden;
}
.magazine {
  grid-auto-rows: auto;
}

.main .style_container {
  display: grid;

  grid-template-columns: 0.6fr 2fr 1fr;
  justify-content: space-around;
  justify-items: center;
  gap: 30px;
  & .culture_block {
    & .culture_list {
      grid-template-rows: auto;
      grid-auto-rows: 250px;
      overflow: hidden;
      @media (max-width: 780px) {
        overflow: none;
        grid-template-rows: auto;
        grid-auto-rows: auto;
      }
    }
  }

  @media (max-width: 1440px) {
    grid-template-columns: 2fr 1fr;
    & .art {
      display: none;
    }
  }
  @media (max-width: 1124px) {
    grid-template-columns: 1fr;
    & .style_block {
      display: none;
    }
  }
}

.section_must_read {
  display: grid;
  grid-template-columns: 2fr 2fr;
  grid-template-rows: 250px;
  position: relative;
  @media (max-width: 1440px) {
    grid-template-columns: 1fr;
    & .must_read_main {
      display: none;
    }
  }
}
.section_must_read .must_read_main {
  display: grid;
  padding: 0 50px 0 30px;
  grid-column: 1 /2;

  position: absolute;

  top: 140px;
  left: 30px;
  @media (max-width: 1440px) {
    display: none;
  }
}
.section_must_read .must_read_list {
  grid-column: 2;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  gap: 20px;
}

.section_must_read .top {
  grid-row: 1;
  grid-column: span 2;
  background-color: var(--color-violet);
  color: var(--color-light);
  padding: 40px 60px;
  display: grid;
  align-content: start;
}
.section_must_read .top h1 {
  font-size: 3.5rem;
  font-weight: 900;
}

.main {
  padding-left: var(--size-30);
  padding-right: var(--size-30);
  display: grid;

  gap: 30px;
}
.section_media {
  margin-bottom: 30px;
}
</style>
