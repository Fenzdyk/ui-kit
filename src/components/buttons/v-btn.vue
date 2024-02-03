<template>
  <button
    :class="[`btn-color-${props.color} btn-size-${props.size}`, (slots.icon ? `icon-btn-${props.size}` : '')]"
    :type="props.type"
    :disabled="props.disabled"
  >
    <slot name="beforeIcon" />
    <slot />
    <slot name="icon" />
    <span v-if="props.text">{{ props.text }}</span>
    <slot name="afterIcon" />
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();

interface Props {
  text?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  size?: string;
  disabled?: boolean;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: '',
  type: 'button',
  size: 's',
  disabled: false,
  color: 'white'
});

</script>

<style scoped lang="scss">
button {
  font-size: 14px;
  border-radius: var(--l);
  outline: none;
  display: inline-flex;
  align-items: center;
  transition: .2s;
  cursor: pointer;
  span {
    margin: 0 var(--horizontal-40);
  }
  &:disabled {
    color: var(--foreground-disabled);
    background-color: var(--surface-disabled);
    border-color: var(--borders-secondary);
    &:deep(path) {
      fill: var(--foreground-disabled);

    }
  }
}

$sizes:
    "xs" 28px var(--vertical-40) var(--horizontal-snudge) var(--vertical-60),
    "s" 32px var(--vertical-60) var(--horizontal-mnudge) var(--vertical-60),
    "m" 40px var(--vertical-100) var(--horizontal-mnudge) var(--vertical-100),
    "auto" auto;
@each $size, $height, $paddingVertical, $paddingHorizontal, $iconBtnPadding in $sizes {
  .btn-size-#{$size} {
    padding: $paddingVertical $paddingHorizontal;
    height: #{$height};
  }
  .icon-btn-#{$size} {
    padding: $iconBtnPadding;
  }
}

$buttons: (
    "default-button" var(--foreground-primary) var(--surface-primary-default) var(--borders-secondary)
     var(--foreground-primary) var(--surface-primary-hover) var(--borders-secondary)
     var(--foreground-primary) var(--surface-primary-pressed) var(--borders-secondary)
    1 1 1,

    "primary" var(--foreground-primary) var(--surface-tetrady-default) var(--surface-tetrady-default)
    var(--foreground-primary) var(--surface-tetrady-hover) var(--surface-tetrady-hover)
    var(--foreground-brand-pressed) var(--surface-tetrady-pressed) var(--surface-tetrady-pressed)
    var(--foreground-disabled) var(--surface-disabled) var(--borders-primary-rest),

    "ghost" var(--foreground-primary) transparent transparent
    var(--foreground-primary) var(--surface-tetrady-hover) var(--surface-tetrady-hover)
    var(--foreground-brand-pressed) var(--surface-tetrady-pressed) var(--surface-tetrady-pressed)
    var(--foreground-disabled) var(--surface-disabled) var(--borders-primary-rest),

    "accent" var(--static-white) var(--surface-brand-default) var(--surface-brand-default)
    var(--static-white) var(--surface-brand-hover) var(--surface-brand-hover)
    var(--static-white) var(--surface-brand-pressed) var(--surface-brand-pressed)
    var(--foreground-disabled) var(--surface-disabled) var(--borders-primary-rest),

    "no-color" var(--foreground-secondary) transparent transparent
    var(--foreground-primary) transparent transparent
    transparent transparent transparent
    transparent transparent transparent,

);

@each $name, $color, $bgColor, $borderColor,
             $hoverColor, $hoverBgColor, $hoverBorderColor,
             $activeColor, $activeBgColor, $activeBorderColor,
             $disabledColor, $disabledBgColor, $disabledBorderColor in $buttons {
  .btn-color-#{$name} {
    color: $color;
    background-color: $bgColor;
    border: var(--thick) solid $borderColor;
    &:deep(path) {
      transition: .2s;
      fill: $color;
    }
    &:hover {
      color: $hoverColor;
      background-color: $hoverBgColor;
      border-color: $hoverBorderColor;
      &:deep(path) {
        transition: .2s;
        fill: $hoverColor;

      }
    }
    &:active,&.active {
      color: $activeColor;
      background-color: $activeBgColor;
      border-color: $activeBorderColor;
      &:deep(path) {
        fill: $activeColor;
      }
    }
    &:focus-visible {
      outline: var(--thick) solid var(--borders-focus);
    }
    &:disabled {
      color: $disabledColor;
      background-color: $disabledBgColor;
      border-color: $disabledBorderColor;
      &:deep(path) {
        fill: $disabledColor;
      }
    }
  }
}
</style>
