<template>
  <div
    v-show="selectedTitle === props.title"
    class="tabs-content"
  >
    <slot />
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: () => ''
  },
  count: {
    type: Number,
    default: () => 0
  }
});
const selectedTitle = inject('selectedTitle');
</script>
