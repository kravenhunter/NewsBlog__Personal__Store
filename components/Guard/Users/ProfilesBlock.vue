<script setup lang="ts">
import { storeToRefs } from "pinia";

const { usersState } = storeToRefs(useUserStore());
const { deleteUser } = useUserStore();
</script>

<template>
  <div class="wrapper_block">
    <h2>Users List</h2>
    <ul class="list_block" v-for="(user, i) in usersState.userList" :key="i" :id="user.id">
      <li>
        <h4>{{ user.userNameField }}</h4>
      </li>
      <li>
        {{ user.emailField }}
      </li>

      <li>
        <LazyUiElementsAddButton
          title="Delete"
          font-size="14px"
          paddings="0.4em"
          color-bg="dark"
          @click="deleteUser(user.id)"
          >Delete</LazyUiElementsAddButton
        >
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.wrapper_block {
  display: grid;
  grid-template-columns: 500px;
  row-gap: 30px;
}
.wrapper_block {
  & .list_block {
    display: grid;
    row-gap: 10px;
    grid-template-columns: repeat(3, auto);
    justify-content: space-between;
    & li {
      display: flex;
      column-gap: 10px;
      align-items: center;
    }
  }
}
</style>
