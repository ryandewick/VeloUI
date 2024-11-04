<template>
  <button
    class="v-button"
    :aria-label="ariaLabel "
    :style="buttonStyle"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

type Data = {
  isHovered: boolean;
};

export default defineComponent({
  name: "VButton",

  data(): Data {
    return {
      isHovered: false,
    };
  },

  props: {
    textColour: {
      type: String as PropType<string>,
      default: "white",
    },

    textColourHover: {
      type: String as PropType<string>,
      default: "",
    },
    bgColour: {
      type: String as PropType<string>,
      default: "blue",
    },
    bgColourHover: {
      type: String as PropType<string>,
      default: "pink",
    },
    ariaLabel : {
      type: String as PropType<string>,
      default: "Button",
    },
  },

  computed: {
  buttonStyle(): Record<string, string> {
    return {
      color: this.isHovered ? this.textColourHover : this.textColour,
      backgroundColor: this.isHovered ? this.bgColourHover : this.bgColour,
    };
  },
}
});
</script>

<style lang="scss" scoped>
.v-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
