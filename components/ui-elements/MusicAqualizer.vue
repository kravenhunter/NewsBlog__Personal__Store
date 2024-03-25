<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IFileData } from "~/types";

interface IProps {
  showList?: boolean | null;
}
const props = defineProps<IProps>();

interface IDurationObject {
  id?: string;
  durationTime?: string;
}

const { podCastList } = storeToRefs(useUnionStore());

const currentSongObject = ref<IFileData | null>(null);
const currentIndex = ref(0);

const durationList = ref<IDurationObject[]>([]);
const previosSong = ref<IFileData | null>(null);

const isPlay = ref(false);
const audioPlayer = ref<HTMLAudioElement>();

const duration = ref("0:00");
const correntTime = ref("0:00");
const isSpinNext = ref(false);
const isSpinBack = ref(false);
const playPromise = ref<Promise<void>>();

const isPlaying = ref(false);

const propgresBar = ref("0%");

const prevExisted = computed(() => !!podCastList.value[currentIndex.value - 1]);

const nextExisted = computed(() => !!podCastList.value[currentIndex.value + 1]);

const timeConvert = (timeNum: number) => {
  const totalMin = Math.floor(timeNum / 60);
  const totalSec = Math.floor(timeNum % 60);

  if (totalSec < 10) {
    return `${totalMin}:0${totalSec}`;
  }

  return `${totalMin}:${totalSec}`;
};
const convertDataBar = (time: number) => Math.floor(time);

const onPlaying = (e: Event) => {
  const audioEvent = e.target as HTMLAudioElement;
  audioEvent?.duration &&
    (propgresBar.value = `${convertDataBar(
      (audioEvent?.currentTime / audioEvent?.duration) * 100,
    )}%`);
  correntTime.value = timeConvert(audioEvent?.currentTime);
};
const resetData = () => {
  propgresBar.value = "0%";

  correntTime.value = "0:00";
  duration.value = "0:00";
  isPlay.value = true;
};

const initializeSong = async () => {
  resetData();
  currentSongObject.value = podCastList.value[currentIndex.value];
  if (currentSongObject.value) {
    console.log(currentSongObject.value);

    duration.value = await getDuration(currentSongObject.value);

    audioPlayer.value?.src &&
      currentSongObject.value?.adition_binary &&
      (audioPlayer.value.src = currentSongObject.value.adition_binary);

    setTimeout(() => (previosSong.value = currentSongObject.value), 500);
  }
};

const play = (val: boolean) => {
  isPlaying.value = val;

  isPlaying.value &&
    audioPlayer.value &&
    (playPromise.value = audioPlayer.value.play().then(() => {
      isPlay.value = !isPlay.value;
    }));

  !isPlaying.value &&
    playPromise.value &&
    playPromise.value.then(() => {
      audioPlayer.value && audioPlayer.value.pause();
      isPlay.value = !isPlay.value;
    });
};

const prev = async () => {
  console.log("prev");
  currentIndex.value = currentIndex.value - 1;
  isSpinBack.value = true; // true
  await initializeSong();

  // play();
  setTimeout(() => (isSpinBack.value = false), 1500);
};

const next = async () => {
  // play(false);
  console.log("Next");

  currentIndex.value = currentIndex.value + 1;

  isSpinNext.value = true; // true
  await initializeSong();
  // play(true);
  setTimeout(() => (isSpinNext.value = false), 1500);
};
const selectHandler = async (id: string | undefined) => {
  id && (currentIndex.value = podCastList.value.findIndex((el) => el.id === id));

  isSpinNext.value = !isSpinNext.value; // true
  await initializeSong();
  //play(true);
  setTimeout(() => (isSpinNext.value = false), 1500);
};

function getDuration(song: IFileData) {
  return new Promise<string>((resolve) => {
    const musicPlayer = new Audio();
    song.adition_binary && (musicPlayer.src = song.adition_binary);

    musicPlayer.src &&
      (musicPlayer.onloadeddata = () => {
        resolve(timeConvert(musicPlayer.duration));
      });
  });
}

const loadDurationList = async () => {
  podCastList.value?.forEach(async (el) => {
    const promisResulte = await getDuration(el);
    durationList.value?.push({ id: el.id, durationTime: promisResulte });
  });
};

const loadData = async () => {
  await loadDurationList();
  await initializeSong();
};

onMounted(async () => await loadData());
</script>

<template>
  <div class="aqializer_container">
    <div class="aqualizer_block" v-if="currentSongObject?.adition_binary">
      <audio
        id="player"
        preload="none"
        ref="audioPlayer"
        @timeupdate="onPlaying"
        :src="currentSongObject.adition_binary"></audio>
      <div class="album_block">
        <NuxtImg
          :class="{ spin_next: isSpinNext, spin_back: isSpinBack }"
          :src="`data:image/webp;base64,${currentSongObject.file_binary}`"
          :alt="currentSongObject.title" />
        <span></span>
      </div>
      <div class="aqualizer_wrapper" v-if="podCastList">
        <div class="title_block">
          <div class="name_block">
            <ul class="title_song" v-for="(el, i) in podCastList" :key="i">
              <Transition name="slide-up">
                <li v-if="el.id === currentSongObject.id">
                  <h4>{{ el.title }}</h4>
                  <span>{{ el.description }}</span>
                </li>
              </Transition>
            </ul>
          </div>
          <div class="progress_block">
            <span class="current">{{ correntTime }}</span>
            <div class="progress_area">
              <div class="progress_bar"></div>
            </div>
            <span class="current">{{ duration }}</span>
          </div>
        </div>
        <div class="aqualizer">
          <div class="prev_block">
            <UiElementsAddButton
              title="Previos"
              :show-slot="true"
              paddings="0px"
              @click="prev"
              :disabled="!prevExisted">
              <UiElementsAddIcon icon-name="ion:play-back-sharp" size-width="45" size-heigth="35" />
            </UiElementsAddButton>
          </div>
          <div class="play_block">
            <UiElementsAddButton
              v-if="isPlay"
              title="Play"
              :show-slot="true"
              paddings="0px"
              @click="play(true)">
              <UiElementsAddIcon icon-name="carbon:play-filled" size-width="45" size-heigth="45" />
            </UiElementsAddButton>

            <UiElementsAddButton
              v-else
              title="Pause"
              :show-slot="true"
              paddings="0px"
              @click="play(false)">
              <UiElementsAddIcon icon-name="tdesign:pause" size-width="45" size-heigth="45" />
            </UiElementsAddButton>
          </div>
          <div class="next_block">
            <UiElementsAddButton
              title="Next"
              :show-slot="true"
              paddings="0px"
              @click="next"
              :disabled="!nextExisted">
              <UiElementsAddIcon
                icon-name="ion:play-back-sharp"
                size-width="45"
                size-heigth="35"
                :turn-x="true" />
            </UiElementsAddButton>
          </div>
        </div>
      </div>
    </div>
    <div class="aqializer_container_list" v-if="showList && podCastList">
      <ul>
        <li
          v-for="el in podCastList"
          :key="el.id"
          @click="selectHandler(el?.id)"
          :class="{ active_item: el.id === currentSongObject?.id }">
          <div class="item_title">
            <h4>{{ el.title }}</h4>
            <span>{{ el.description }}</span>
          </div>
          <div class="time">
            <p>{{ durationList?.find((duration) => duration.id === el.id)?.durationTime }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aqializer_container {
  display: grid;
  row-gap: 30px;
}
.aqializer_container_list {
  display: grid;
  justify-content: center;
  & .time {
    display: flex;
    justify-content: flex-end;
  }
  & ul {
    display: grid;
    row-gap: 20px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 15px;
  }
  & ul li {
    cursor: pointer;
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 50px;
    align-items: center;
    border-bottom: 3px solid var(--color-darkGrey2);
    padding: 10px;
    transition: all 0.7s;
    &.active_item {
      background-color: var(--color-red);
      color: var(--color-light);
    }
  }
  & .item_title {
    display: grid;
    row-gap: 10px;
  }
}
.aqualizer_block {
  width: 500px;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 150px;
}
.aqualizer_block {
  & .aqualizer_wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 20%;

    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 15px 15px 15px 90px;
    display: grid;
  }
}

.title_block {
  display: grid;
  grid-template-rows: 1fr 1fr;
  row-gap: 15px;
  align-content: start;
  & span {
    font-size: 15px;
    font-style: italic;
  }
  & .name_block {
    position: relative;
    & ul {
      list-style: none;
    }
    & .title_song {
      position: absolute;
    }
  }
  & .progress_block {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 15px;
    & .progress_area {
      height: 6px;
      width: 70%;
      background-color: var(--color-grey);
      cursor: pointer;

      & .progress_bar {
        position: relative;
        height: 6px;
        width: v-bind(propgresBar);
        background-color: var(--color-red);
      }
      & .progress_bar::before {
        content: "";
        position: absolute;
        height: 13px;
        width: 13px;
        background: var(--color-dark);
        right: -5px;
        border-radius: 50%;
        transform: translateY(-26%);
      }
    }
  }
}

.aqualizer_wrapper {
  & .aqualizer {
    display: grid;
    grid-template-columns: repeat(3, auto);
    align-items: center;
    justify-content: center;
    column-gap: 50px;
    padding-right: 25px;
  }
}

.aqualizer_block {
  & .album_block {
    position: relative;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    overflow: hidden;
    & img {
      object-fit: cover;
      height: 100%;
      width: 100%;

      &.spin_next {
        transition: all 1.4s;
        rotate: calc(720deg);
      }
      &.spin_back {
        transition: all 1.4s;
        rotate: calc(-720deg);
      }
    }
    & span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 10px;
      height: 10px;
      background-color: aliceblue;
      border-radius: 50%;
    }
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
