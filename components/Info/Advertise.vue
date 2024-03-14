<script setup lang="ts">
import { useAdvertiseStore } from "@/stores/advertiseStore";
import { storeToRefs } from "pinia";

const { advertiseList } = storeToRefs(useAdvertiseStore());
const errorResponse = createError({ statusCode: 201, statusMessage: "Content not added" });
</script>

<template>
  <div class="galary_container grid_block">
    <h1>Advertisement</h1>
    <p>
      You can cooporate with us and invest our digital paper and we will advertise your services
    </p>
    <div class="wrapp-body" v-if="advertiseList.databaseList.length">
      <div class="wrapp-content">
        <LazyGuardGalaryImageCard
          v-for="element in advertiseList.databaseList"
          :key="element.id"
          :source="element.source"
          :name="element.name"
          :description="element.description" />
      </div>
    </div>
    <div v-else class="no_content">
      <LazyErrorResponse :error-event="errorResponse" />
    </div>
  </div>
</template>

<style scoped>
.grid_block {
  display: grid;
  justify-items: center;
}
.galary_container {
  row-gap: 40px;
}
.galary_container .galary_form {
  max-width: 350px;

  grid-template-rows: 40px 120px;
  grid-auto-rows: 40px;
  row-gap: 40px;
}

.wrapp-body {
  font-family: serif;
  box-sizing: border-box;

  display: flex;

  justify-content: center;
  align-items: center;
}
.wrapp-content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
}

.galary_block {
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 400px));
  grid-auto-rows: 200px;
  gap: 30px;
}
.galary_block img {
  width: 100%;
  object-fit: cover;
}
</style>
