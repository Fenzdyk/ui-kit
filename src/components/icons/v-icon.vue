<template>
  <svg
    :class="`icon icon-color-${props.color}`"
    :width="props.width"
    :viewBox="iconSizes[props.size]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      :d="icons[props.name]"
      :style="{ fill: props.fill }"
    />
  </svg>
</template>

<script setup>
import icons from '@/components/icons/icons';

const iconSizes = {
  xs: '0 0 16 16',
  s: '0 0 20 20',
  m: '0 0 24 24'
};
const props = defineProps({
  name: {
    type: String,
    default: () => ''
  },
  fill: {
    type: String,
    default: () => ''
  },
  color: {
    type: String,
    default: () => 'default'
  },
  size: {
    type: String,
    default: () => 'm'
  },
  width: {
    type: String,
    default: () => '24'
  }
});
</script>

<style scoped lang="scss">
$icons: (
    "default" var(--foreground-secondary),
    "secondary" var(--foreground-secondary),
);

@each $name, $fill in $icons {
  .icon-color-#{$name} {
    path {
      fill: $fill;
    }
  }
}
</style>
