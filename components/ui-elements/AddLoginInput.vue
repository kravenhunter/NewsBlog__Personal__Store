<script setup lang="ts">
import type { ErrorObject } from "@vuelidate/core";

const props = defineProps({
  error: Array as PropType<ErrorObject[]>,

  value: {
    type: String,
    default: "",
  },
  name: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  label: String,
  colorLabel: {
    type: Boolean,
    default: () => false,
  },
  widthForm: {
    type: String,
    default: "300px",
  },
  placeholderColor: {
    type: String,
    default: "#fff",
  },
});

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  emit("update:value", (event?.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="form_input" :style="{ width: widthForm }">
    <input
      class="input_block"
      :type="type"
      :name="name"
      :id="name"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue" />
    <label :for="name" class="label_block" :class="colorLabel ? 'color_light' : 'color_violet'">{{
      label
    }}</label>
    <div class="line"></div>

    <TransitionGroup name="errors">
      <div class="form-error" v-for="element of error" :key="element.$uid">
        <div class="form-error__message">{{ element.$message }}</div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style lang="scss" scoped>
.color_violet {
  color: var(--color-violet);
}
.color_light {
  color: var(--color-light);
}
.form_input {
  position: relative;
  color: #fff;
}
.form_input .line {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background: var(--color-light);
}

.form_input input {
  height: 100%;
  width: 100%;
  padding: 0 10px;
  border-radius: 7px;
  font-size: 15px;
  z-index: 1;
  background: transparent;
}
.form_input .input_block::placeholder {
  /* Most modern browsers support this now. */
  color: #fff;
}

.form_input .input_block:focus + .label_block {
  z-index: 1;
  opacity: 1;
  top: -20px;
}
.form_input .label_block {
  font-weight: bold;
  display: block;
  position: absolute;
  top: 20px;
  z-index: -1;
  opacity: 0;

  transition: 0.3s;
  font-size: 13px;
}

.form_input .form-error {
  background: var(--color-red);
  position: absolute;

  font-size: 13px;
  font-weight: 600;
  color: #fff;
  padding: 7px;
  border-radius: 5px;
  bottom: -35px;
}
.errors-enter-active,
.errors-leave-active {
  transition: opacity 0.5s ease;
}
.errors-enter-from,
.errors-leave-to {
  opacity: 0;
}
</style>
