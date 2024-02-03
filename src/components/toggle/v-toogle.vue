<template>
  <label
    class="toggle"
    :class="{ checked: modelValue, disabled }"
  >
    <input
      type="checkbox"
      :id="props.id"
      @change="emit('update:modelValue', $event.target.checked)"
      :value="modelValue"
      :checked="modelValue"
      :disabled="disabled"
    >
    <span class="toggle-thumb" />
  </label>
</template>

<script setup>

const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  id: {
    type: String,
    default: () => ''
  },
  modelValue: {
    type: Boolean,
    default: () => false
  },
  disabled: {
    type: Boolean,
    default: () => false
  }
});
</script>

<style scoped lang="scss">
.toggle {
  width: 40px;
  height: 24px;
  cursor: pointer;
  border-radius: 999px;
  border: 1.5px solid var(--borders-primary-rest);
  background-color: transparent;
  position: relative;
  margin: 0;
  transition: .2s;
  &-thumb {
    // unchecked
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 3px;
    border-radius: 50%;
    background-color: var(--foreground-secondary);
    transition: .2s;
  }
  &:hover {
    background-color: var(--surface-tetrady-hover);
    border-color: var(--borders-primary-hover);
  }
  &.checked {
    background-color: var(--surface-brand-default);
    border-color: var(--surface-brand-default);
    .toggle {
      &-thumb {
        left: 18px;
        background-color: var(--static-white);
      }
    }
    &:hover {
      background-color: var(--surface-brand-hover);
      border-color: var(--surface-brand-hover);
    }
    &:active {
      background-color: var(--surface-brand-pressed);
      border-color: var(--surface-brand-pressed);
    }
  }
  &.disabled {
    background-color: var(--surface-disabled);
    border-color: var(--surface-disabled);
    &:hover {
      background-color: var(--surface-disabled);
      border-color: var(--surface-disabled);
    }
    &:active {
      background-color: var(--surface-disabled);
      border-color: var(--surface-disabled);
    }
  }
  input {
    display: none;
  }
}
</style>
