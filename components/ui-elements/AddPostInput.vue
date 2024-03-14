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
  heightForm: {
    type: String,
    default: "100%",
  },
  placeholderColor: {
    type: String,
    default: "#fff",
  },
  isInput: {
    type: Boolean,
    default: true,
  },
  paddings: {
    type: String,
    default: "0 10px",
  },
});

const emit = defineEmits(["update:value"]);

const updateValue = (event: Event) => {
  emit("update:value", (event?.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="formfields_container sizing">
    <div v-if="isInput" class="form_input sizing">
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

      <TransitionGroup name="errors">
        <div class="form-error" v-for="element of error" :key="element.$uid">
          <div class="form-error__message">{{ element.$message }}</div>
        </div>
      </TransitionGroup>
    </div>
    <div v-if="!isInput" class="form_input sizing">
      <textarea
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

      <TransitionGroup name="errors">
        <div class="form-error" v-for="element of error" :key="element.$uid">
          <div class="form-error__message">{{ element.$message }}</div>
        </div>
      </TransitionGroup>
    </div>
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
}
.sizing {
  height: v-bind(heightForm);
  width: v-bind(widthForm);
}
.form_input textarea {
  padding: v-bind(paddings);
}
.form_input input,
textarea {
  color: var(--color-dark);
  background-color: var(--color-light);
  border: 1px solid var(--color-darkBlue);
  height: 100%;
  width: 100%;
  padding: 0 10px;
  border-radius: 7px;
  font-size: 15px;
  z-index: 1;
}
.form_input input::placeholder {
  /* Most modern browsers support this now. */
  color: #7f7f7f;
}

/* .form_input input:focus + .label_block {
  z-index: 1;
  opacity: 1;
  top: -20px;
} */
.form_input input:focus,
textarea:focus {
  & + .label_block {
    z-index: 1;
    opacity: 1;
    top: -20px;
  }
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
