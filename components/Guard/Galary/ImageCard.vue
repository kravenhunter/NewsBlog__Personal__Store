<script setup lang="ts">
import type { IFileData } from "~/types";

interface IProps {
  source: string;
  title: string;
  description: string;
}
interface IImage {
  itemId?: string;
  title?: string;
  image?: IFileData;
}
const props = defineProps<IImage>();

const emit = defineEmits<{
  (e: "remove", id: string): void;
}>();
// defineProps({
//   source: {
//     type: String,
//     reqired: true,
//   },
//   name: {
//     type: String,
//     reqired: true,
//   },
//   description: {
//     type: String,
//     reqired: true,
//   },
// });
const remove = () => {
  if (props.itemId) {
    emit("remove", props.itemId);
  } else {
    props.image?.id && emit("remove", props.image?.id);
  }
  console.log(props.itemId, props.image?.id);
};
</script>

<template>
  <div class="image" v-if="image">
    <!--   <NuxtImg :src="`data:image/webp;base64,${image.file_binary}`" :alt="image.title" /> -->
    <NuxtImg :src="image.file_binary" :alt="image.title" :id="image.id" />
    <div class="intro">
      <h1>{{ title ?? image.title }}</h1>
      <p>{{ image.description }}</p>

      <button type="button" class="btn" @click="remove">Remove</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.image {
  width: 280px;
  height: 360px;
  padding: 2rem 1rem;
  background: #fff;
  position: relative;
  display: flex;
  align-items: flex-end;
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
  transition: 0.5s ease-in-out;
}
.image:hover {
  transform: translateY(20px);
}
.image:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 176, 155, 0.5), rgba(150, 201, 61, 1));
  z-index: 2;
  transition: 0.5s all;
  opacity: 0;
}
.image:hover:before {
  opacity: 1;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}
.image .intro {
  position: relative;
  z-index: 3;
  color: #fff;
  transition: 0.5s all;
  transform: translateY(30px);
  opacity: 0;
}
.image:hover .intro {
  opacity: 1;
  transform: translateY(0px);
}
.image .intro h1 {
  margin: 0;
}
.image .intro p {
  letter-spacing: 1px;
  font-size: 15px;
  margin-top: 8px;
  margin-bottom: 20px;
}
.image .intro .btn {
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: #fff;
  color: black;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease-in-out;
}
.image .intro .btn:hover {
  box-shadow: 0px 7px 10px rgba(0, 0, 0, 0.5);
}
</style>
