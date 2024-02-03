<template>
  <span
    class="tag"
    :class="`tag-size-${props.size} tag-type-${props.type}`"
  >
    {{ props.text }}
  </span>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: () => 'm'
  },
  type: {
    type: String,
    default: () => 'default'
  },
  text: {
    type: String,
    default: () => ''
  }
});
</script>

<style scoped lang="scss">
$sizes: (
    "m": 2px 5px,
);
@each $size, $value in $sizes {
  .tag-size-#{$size} {
    padding: #{$value};
  }
}

$colors: (
    "default" red black,
    "new" var(--static-white) var(--surface-error-and-status-green-1),
    "edited" var(--static-black) var(--surface-error-and-status-yellow-1),
);
@each $type, $color, $bgColor in $colors {
  .tag-type-#{$type} {
    color: $color;
    background-color: $bgColor;
  }
}

.tag {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  border-radius: 4px;
}
</style>
