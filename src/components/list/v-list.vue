<template>
  <button
    type="button"
    :class="`list-item  list-size-${props.size} `"
  >
    <slot name="beforeIcon" />
    <slot />
    {{ props.text }}
    <slot name="afterIcon" />
  </button>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  size: {
    type: String,
    default: () => 's'
  }
});
</script>

<style scoped lang="scss">
.list-item {
  display: flex;
  align-items: center;
  color: var(--foreground-secondary);
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  &:hover {
    background-color: var(--surface-primary-hover);
  }
  &:active {
    background-color: var(--surface-primary-pressed);
  }
}

$sizes: (
    "s": 32px,
    "m": 40px,
);
@each $size, $value in $sizes {
  .list-item-size-#{$size} {
    height: #{$value};
  }
}
</style>
