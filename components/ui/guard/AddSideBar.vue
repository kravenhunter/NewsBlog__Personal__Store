<script setup lang="ts">
const isExpanded = ref(false);

// const { statAuth } = storeToRefs(useAuthStore());
const { signOut, status } = useAuth();

const toggleMenu = () => {
  isExpanded.value = !isExpanded.value;
};

const logOutHandler = async () => {
  try {
    await signOut();
    if (status.value === "unauthenticated") {
      navigateTo("/");
    } else {
      throw new Error("Error Log out");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <aside :class="isExpanded && 'is_expanded'">
    <div class="logo grid_block">
      <UiElementsNuxtIcon />
    </div>

    <div class="menu_toglle_wrap">
      <button type="button" title="toggle_button" class="menu_toggle" @click="toggleMenu">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="ri:arrow-right-double-fill"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
      </button>
    </div>
    <h3>Admin Panel</h3>
    <div class="admin_menu">
      <UiElementsAddLink class="button" to-path="/guard/posts">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="vaadin:home-o"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Articles</span>
      </UiElementsAddLink>
      <UiElementsAddLink class="button" to-path="/guard/category">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="carbon:category-new-each"
            color-icon="white"
            size-width="40"
            size-heigth="40"
        /></span>
        <span class="menu_text">Categories</span>
      </UiElementsAddLink>
      <UiElementsAddLink class="button" to-path="/guard/podcasts">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="solar:podcast-bold"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Podcasts</span>
      </UiElementsAddLink>
      <UiElementsAddLink class="button" to-path="/guard/galary">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="bi:images"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Galary</span>
      </UiElementsAddLink>

      <UiElementsAddLink class="button" to-path="/guard/advertise">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="ri:advertisement-line"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Advertise</span>
      </UiElementsAddLink>

      <UiElementsAddLink class="button" to-path="/guard/navigation">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="tabler:route"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Navigation</span>
      </UiElementsAddLink>
      <UiElementsAddLink class="button" to-path="/guard/aboutus">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="mdi:about-circle-outline"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">About Us</span>
      </UiElementsAddLink>

      <UiElementsAddLink class="button" to-path="/guard/contacts">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="material-symbols:contact-mail-outline"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Contacts</span>
      </UiElementsAddLink>

      <UiElementsAddLink class="button" to-path="/guard/users">
        <span class="material_icon">
          <UiElementsAddIcon
            icon-name="ph:users-three"
            color-icon="white"
            size-width="40"
            size-heigth="40" />
        </span>
        <span class="menu_text">Users</span>
      </UiElementsAddLink>
    </div>
    <div class="empty_block">
      <div class="settings_block">
        <UiElementsAddLink class="button" to-path="/">
          <span class="material_icon">
            <UiElementsAddIcon
              icon-name="icon-park-outline:back"
              color-icon="white"
              size-width="40"
              size-heigth="40" />
          </span>
          <span class="menu_text">Back To Main</span>
        </UiElementsAddLink>
        <UiElementsAddLink class="button" to-path="/guard/settings">
          <span class="material_icon">
            <UiElementsAddIcon
              icon-name="material-symbols:settings-outline"
              color-icon="white"
              size-width="40"
              size-heigth="40" />
          </span>
          <span class="menu_text">Settings</span>
        </UiElementsAddLink>
        <UiElementsAddButton
          @click="logOutHandler"
          paddings="0px"
          class="button log_out"
          title="Log Out"
          type="button">
          <span class="material_icon">
            <UiElementsAddIcon
              icon-name="tabler:logout"
              color-icon="white"
              size-width="40"
              size-heigth="40" />
          </span>
          <span class="menu_text">Log Out</span>
        </UiElementsAddButton>
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
aside .logo {
  grid-template-columns: calc(2rem + 10px);
  justify-content: center;
}
.grid_block {
  display: grid;
}
.settings_block {
  width: 100%;
  & a,
  button {
    margin-top: 15px;
  }
}
aside .admin_menu {
  display: flex;
  flex-direction: column;
  row-gap: 15px;
}

aside .empty_block {
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: flex-end;
}
aside {
  display: grid;
  grid-template-rows: 40px 40px 30px;
  grid-template-columns: calc(2rem + 20px);
  align-content: start;
  background-color: var(--color-dark);
  color: var(--color-light);
  // width: calc(2rem + 60px);
  overflow: hidden;
  min-height: 100vh;
  padding: 1.3rem;
  transition: 0.3s ease-out;
}
@media (max-width: 768px) {
  aside {
    position: fixed;
    z-index: 99;
  }
}

aside h3,
.button .menu_text {
  opacity: 0;
  transition: 0.2s ease-out;
}

aside .button {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.1rem;

  column-gap: 20px;
}
.router-link-active {
  border-right: 5px solid var(--color-green);
}
aside .button:hover,
.router-link-active {
  background-color: var(--color-darkGrey);

  .material_icon,
  .menu_text {
    color: var(--color-green);
  }
}

aside .menu_text {
  font-size: 1.1rem;
}
aside .menu_toggle {
  background-color: transparent;
  cursor: pointer;

  transition: 0.2s ease-out;
}

aside .menu_toggle:hover {
  transform: translateX(0.5rem);
  transition: 0.2s ease-out;
}

aside .menu_toglle_wrap {
  display: flex;
  justify-content: flex-end;
}
.is_expanded {
  grid-template-columns: 300px;

  h3,
  .button .menu_text {
    opacity: 1;
    transition: 0.6s ease-out;
  }
}
.is_expanded .menu_toggle {
  rotate: calc(-180deg);
}
</style>
