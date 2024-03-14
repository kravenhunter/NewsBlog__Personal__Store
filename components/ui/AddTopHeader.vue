<script setup lang="ts">
import { useAuthStore } from "@/stores/authStore";
import formatPath from "@/utils/formatPath";
import { storeToRefs } from "pinia";
import type { INavigation } from "types/INavigation";

defineProps({
  topLinks: {
    type: Array as PropType<INavigation[]>,
    default: null,
  },
  categoryLinks: {
    type: Array as PropType<INavigation[]>,
    default: null,
  },
});

defineEmits<{
  searchInput: [value: string];
}>();

const convertPath = (title: string | undefined) => title && `/${title?.toLocaleLowerCase()}/list`;

const searchReqiest = ref("");
const openSearch = ref(true);

const isShow = ref(false);
const isBurgerOpen = ref(false);
const openLogIn = ref(false);
const opnenSignIn = ref(false);
const opemProfile = ref(false);

const { signOutUser } = useAuthStore();
const { statAuth } = storeToRefs(useAuthStore());

const toggleHandler = (event: boolean) => (isShow.value = !event);

const openSigninWindow = (event: boolean) => {
  opnenSignIn.value = event;
  openLogIn.value = !event;
};
const openLogInWindow = (event: boolean) => {
  openLogIn.value = event;
  opnenSignIn.value = !event;
};
const logOutHandler = async () => {
  const status = await signOutUser();

  if (status.statusCode === 200) {
    opemProfile.value = false;
  }
  status.statusCode === 405 && console.log("Error Log out", status.message);
};
const searchHandler = (search: string) => {
  search && navigateTo(`/search/${search}`);
};
</script>

<template>
  <div class="header_top">
    <div class="topLinks_wrapper">
      <ul class="topLinks flex">
        <li v-for="(topLink, i) in topLinks" :key="i" :data-id="i">
          <NuxtLink
            class="topLink"
            v-if="topLink.title === 'Events'"
            :to="{ path: `/${topLink.title?.toLocaleLowerCase()}/list` }">
            {{ topLink.title }}
          </NuxtLink>
          <NuxtLink
            v-else
            :to="{ path: `/${topLink.title && formatPath(topLink.title?.toLocaleLowerCase())}` }">
            {{ topLink.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="search_block">
      <UiElementsAddButton
        type="button"
        class="search_btn"
        title="search"
        font-size="1rem"
        paddings="0px"
        @click="openSearch = !openSearch">
        <UiElementsAddIcon
          color-icon="white"
          icon-name="material-symbols:search"
          size-width="27"
          size-heigth="27" />
      </UiElementsAddButton>
      <div class="search_input" :class="openSearch && 'search_close'">
        <UiElementsAddPostInput
          label="Search"
          height-form="30px"
          font-size="2rem"
          name="top_search"
          placeholder="Input search"
          v-model:value.trim="searchReqiest"
          @keyup.enter="searchHandler(searchReqiest)" />
      </div>
    </div>

    <div class="burger_icon">
      <UiElementsDynamicTransition size-container="32px">
        <UiElementsAddIcon
          v-if="!isBurgerOpen"
          @click="isBurgerOpen = !isBurgerOpen"
          icon-name="iconamoon:menu-burger-horizontal"
          color-icon="white" />
        <UiElementsAddIcon
          v-else
          @click="isBurgerOpen = !isBurgerOpen"
          icon-name="carbon:close-filled"
          color-icon="white" />
      </UiElementsDynamicTransition>
    </div>

    <ul class="signInLinks flex">
      <li class="links">
        <UiElementsDynamicTransition>
          <div class="profile_container" v-if="statAuth.authenticated">
            <div class="login">
              <p>{{ statAuth.authUser?.userNameField }}</p>
            </div>
            <div class="user_block">
              <UiElementsAddButton
                type="button"
                class="user_btn"
                title="user"
                paddings="0px"
                @click="opemProfile = !opemProfile">
                <UiElementsAddIcon
                  icon-name="mingcute:user-4-line"
                  color-icon="#64748b"
                  size-width="30"
                  size-heigth="30" />
              </UiElementsAddButton>
              <div class="user_menu" :class="opemProfile ? '' : 'is_closed_menu'">
                <ul>
                  <li>
                    <UiElementsAddLink font-size="14px" paddings="0.5em 2.8em" color-bg="dark"
                      >Profile</UiElementsAddLink
                    >
                  </li>

                  <li>
                    <UiElementsAddLink
                      to-path="/guard/posts"
                      font-size="14px"
                      paddings="0.5em 1.2em"
                      color-bg="dark"
                      >Admin Panel</UiElementsAddLink
                    >
                  </li>
                  <li>
                    <UiElementsAddButton
                      color-bg="dark"
                      paddings="0.5em 1.1em"
                      font-size="14px"
                      @click="logOutHandler"
                      >Log Out</UiElementsAddButton
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="auth_links" v-else>
            <UiElementsAddButton
              color-bg="dark"
              paddings="0rem"
              font-size="15px"
              @click="
                {
                  (isShow = true), (opnenSignIn = true), (openLogIn = false);
                }
              "
              ><span>Sign In</span></UiElementsAddButton
            >
            <span>/</span>
            <UiElementsAddButton
              label="Join"
              color-bg="dark"
              paddings="0rem"
              font-size="15px"
              @click="
                {
                  (isShow = true), (openLogIn = true), (opnenSignIn = false);
                }
              "
              ><span>Join</span></UiElementsAddButton
            >
          </div>
        </UiElementsDynamicTransition>
      </li>
    </ul>

    <div class="window_popup" id="modal_widow" :class="{ active: isShow }">
      <div v-if="opnenSignIn" class="signin_window">
        <AuthSignIn @close-modal-emit="toggleHandler" @goto-log-in="openLogInWindow" />
      </div>
      <div v-if="openLogIn" class="login_window">
        <AuthLogIn @close-modal-emit="toggleHandler" @goto-sign-in="openSigninWindow" />
      </div>
    </div>
    <div id="pop_up" :class="{ active: isShow }"></div>

    <div class="burger_menu">
      <UiElementsDynamicAccordion
        :is-open-accord="isBurgerOpen"
        max-width="100vw"
        over-flow="hidden"
        paddings="0 1.2em"
        bd-color="#000000"
        color-text="#ffffff"
        max-height="20rem">
        <div class="burger_wrapper">
          <div class="burger_auth">
            <ul class="burger_auth_links">
              <li class="links">
                <div class="burger_profile" v-if="statAuth.authenticated">
                  <p>{{ statAuth.authUser?.userNameField }}</p>
                  <UiElementsAddButton
                    type="button"
                    class="user_btn"
                    title="user"
                    paddings="0px"
                    @click="opemProfile = !opemProfile">
                    <UiElementsAddIcon
                      icon-name="mingcute:user-4-line"
                      color-icon="#64748b"
                      size-width="30"
                      size-heigth="30" />
                  </UiElementsAddButton>

                  <UiElementsAddButton
                    :class="opemProfile ? '' : 'is_closed_menu'"
                    color-bg="dark"
                    paddings="0.5em "
                    font-size="14px"
                    @click="logOutHandler">
                    <UiElementsAddIcon
                      icon-name="tabler:logout"
                      color-icon="white"
                      size-width="30"
                      size-heigth="30" />
                  </UiElementsAddButton>
                </div>

                <div class="burger_signin" v-else>
                  <UiElementsAddButton
                    color-bg="dark"
                    paddings="0rem"
                    font-size="15px"
                    @click="
                      {
                        (isShow = true), (opnenSignIn = true), (openLogIn = false);
                      }
                    "
                    ><span>Sign In</span></UiElementsAddButton
                  >
                  <span>/</span>
                  <UiElementsAddButton
                    label="Join"
                    color-bg="dark"
                    paddings="0rem"
                    font-size="15px"
                    @click="
                      {
                        (isShow = true), (openLogIn = true), (opnenSignIn = false);
                      }
                    "
                    ><span>Join</span></UiElementsAddButton
                  >
                </div>
              </li>
            </ul>
          </div>
          <h3 class="burger_categories">CATEGORIES</h3>
          <ul v-if="categoryLinks">
            <li v-for="(link, i) in categoryLinks" :key="i" :data-id="i">
              <UiElementsAddLink
                :to-path="convertPath(link.title)"
                font-size="14px"
                paddings="0.5em 1.2em"
                color-bg="dark"
                >{{ link.title }}</UiElementsAddLink
              >
            </li>
          </ul>
        </div>
      </UiElementsDynamicAccordion>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/sizeMixin.scss";

.test_transition {
  width: 350px;
}

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
  width: 500px;
  max-width: 80%;
}

.window_popup.active {
  transform: translate(-50%, -50%) scale(1);
}
/* Header */
.header_top {
  position: relative;
  background-color: var(--color-dark);
  color: var(--color-light);
  display: grid;
  font-size: 0.9rem;
  grid-template-columns: 1fr 1fr 0.23fr;
  grid-auto-rows: 30px;
  padding: 20px 20px 10px 20px;
  & .burger_icon {
    display: none;
  }
  & .burger_menu {
    display: none;
  }
  & .topLinks {
    grid-column: 1;
  }
  & .top_search {
    grid-column: 2;
  }
  & .signInLinks {
    grid-column: 3;
  }
  @media (max-width: 1170px) {
    //для работы микина нужно файл  подключить в конфиге
    @include adaptive("font-size", 16, 20, 1);
  }
  @media (max-width: 1080px) {
    grid-template-columns: 1fr 0.1fr;
    & .topLinks_wrapper {
      display: none;
    }
    & .top_search {
      grid-column: 1;
    }
    & .signInLinks {
      grid-column: 2;
    }
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr 0.1fr;

    & .signInLinks {
      display: none;
    }
    & .search_block {
      grid-column: 1;
    }
    & .burger_icon {
      grid-column: 2;
      justify-self: end;
      display: block;
    }
    /*     & .burger_menu {
      display: block !important;
    } */
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    & .search_block {
      opacity: 0;
    }
  }
}

.flex {
  display: flex;
  column-gap: 10px;
}

.header_top {
  & .search_block {
    display: grid;
    justify-content: end;
    padding-right: 15px;
    position: relative;
    & .search_input {
      position: absolute;
      max-width: 100%;
      top: 0;
      right: 50px;
      /*    padding: 10px 5px 5px 5px; */
      height: 100%;
      overflow: hidden;
      transition: max-width 1s ease;
      &.search_close {
        max-width: 0;

        transition: max-width 0.3s ease;
      }
    }
  }
}
.header_top {
  & .burger_menu {
    display: none;
    width: 100%;
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 5;

    & .burger_categories {
      display: grid;
      justify-items: center;
      padding-top: 15px;
    }
    & ul {
      padding: 20px 0;
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 20px;
    }
    & .burger_auth {
      &_links {
        display: flex;
        // overflow: hidden;
        justify-content: flex-end;
      }
      & .burger_signin {
        display: grid;
        grid-template-columns: repeat(3, auto);
        column-gap: 10px;
      }
    }
    & .burger_profile {
      display: grid;
      grid-template-columns: repeat(3, auto);
      align-items: center;
      column-gap: 10px;
      & p {
        font-size: 18px;
      }
    }
    @media (max-width: 700px) {
      display: grid;
      align-content: start;
    }
  }
  /*   & .burger_menu {
    display: none;
    width: 100vw;
    max-height: 20rem;
    position: absolute;
    top: 50px;
    right: 0;
    z-index: 5;

    color: var(--color-light);
    background-color: var(--color-dark);
    overflow: hidden;

    align-content: start;
    padding: 0px 20px 0 20px;

    &_is_closed {
      max-height: 0;
      transition: all 0.3s ease;
    }
    & .burger_categories {
      justify-self: center;
      padding-top: 15px;
    }
    & ul {
      padding: 20px 0;
      display: grid;
      justify-items: center;
      grid-template-columns: repeat(3, 1fr);
      row-gap: 20px;
    }
    & .burger_auth {
      &_links {
        display: flex;
        // overflow: hidden;
        justify-content: flex-end;
      }
      & .burger_signin {
        display: grid;
        grid-template-columns: repeat(3, auto);
        column-gap: 10px;
      }
    }
    & .burger_profile {
      display: grid;
      grid-template-columns: repeat(3, auto);
      align-items: center;
      column-gap: 10px;
      & p {
        font-size: 18px;
      }
    }
    @media (max-width: 700px) {
      display: grid;
    }
  } */
}

.header_top .signInLinks {
  position: relative;
  // overflow: hidden;
  justify-content: end;

  & .auth_links {
    display: grid;
    grid-template-columns: 80px auto 60px;
    column-gap: 5px;
    /*     grid-auto-rows: 30px;
    padding: 5px; */
    & span {
      font-size: 1.1rem;
      font-weight: 400;
    }
  }
  & .profile_container {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 20px;
    align-items: start;
    justify-content: end;

    & .login {
      height: 100%;
      display: flex;
      padding-top: 5px;
      & p {
        font-size: 16px;
      }

      @media (max-width: 480px) {
        & p {
          @include adaptive("font-size", 16, 20, 1);
        }
      }
    }
  }

  & .user_block {
    & .user_menu {
      width: 150px;
      max-height: 40rem;

      position: absolute;
      top: 40px;
      right: 0;
      z-index: 5;
      transition: max-height 1s ease;
      color: var(--color-light);
      background-color: var(--color-dark);
      overflow: hidden;
      &.is_closed_menu {
        max-height: 0;
        transition: max-height 0.3s ease;
      }
      & ul {
        padding: 10px;
        display: grid;
        row-gap: 20px;
        & a,
        button {
          font-weight: 400;
        }
      }
    }
  }
}
.modal_signin_open {
  overflow: hidden;
}
.header_top .modal_signin_show {
  z-index: 100;
}
.header_top .modal_signin {
  grid-column: 2;
  z-index: -20;
  position: absolute;
  width: 100%;
  top: 5vh;
  opacity: 0;
  transition: 0.3s;
  //
  // left: 35vw;
  // width: 500px;
}
.header_top a {
  color: var(--color-light);
  transition: 0.5s;
  transition-property: background-color color;
}

.header_top a:hover {
  color: #febe2b;
}
</style>
