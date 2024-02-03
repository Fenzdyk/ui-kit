<template>
  <div
    class="badge"
    :class="`badge-color-${props.type}`"
    :style="{ backgroundColor: props.color, color: props.colorText }"
  >
    <p>{{ props.text }}</p>
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: () => ''
  },
  type: {
    type: String,
    default: () => 'new'
  },
  color: {
    type: String,
    default: () => 'new'
  },
  colorText: {
    type: String,
    default: () => ''
  }
});
</script>

<style scoped lang="scss">

.badge {
  border-radius: 4px;
  color: var(--static-black);
  p {
    margin: 0;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}

$types: (
    "new" var(--surface-error-and-status-green-1) var(--static-black),
    "edited" var(--surface-error-and-status-yellow-1) var(--static-black),
);
@each $type, $bgColor, $color in $types {
  .badge-color-#{$type} {
    background-color: #{$bgColor};
    color: #{$color};
  }
}
</style>
