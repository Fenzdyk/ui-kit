<template>
  <div
    class="input-wrapper"
    :class=" { error: props.error }"
  >
    <label
      :class="[`input-size-${props.size}`, 'input-label',
               {
                 'input-before-icon': slots.beforeIcon,
                 'input-after-icon': slots.afterIcon && !slots.secondAfterIcon,
                 'input-second-after-icon': slots.afterIcon && slots.secondAfterIcon,
               }]"
    >
      <span class="before-icon">
        <slot name="beforeIcon" />
      </span>
      <template v-if="props.textarea">
        <textarea
          :disabled="props.disabled"
          class="input"
          :class="[`input-type-${props.type}`]"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="onInput"
          @focus="onFocus"
          @change="onChange"
          :rows="props.textareaRows"
          ref="mainInput"
        />
      </template>
      <template v-else-if="props.filepicker">
        <label
          class="input file"
          :class="[`input-size-${props.size}`, `input-type-${props.type}`]"
        >
          <span>
            {{ props.fileName || props.placeholder }}
          </span>
          <input
            ref="mainInput"
            type="file"
            :disabled="props.disabled"
            class="input"
            :placeholder="props.placeholder"
            @change="onChange"
          >
        </label>
      </template>
      <template v-else>
        <input
          ref="mainInput"
          :id="props.inputId"
          :disabled="props.disabled"
          :tabindex="tabindex"
          class="input"
          :class="[`input-type-${props.type}`]"
          :placeholder="props.placeholder"
          :value="props.modelValue"
          @input="onInput"
          @focus="onFocus"
          @change="onChange"
          :autocomplete="props.autocomplete"
          :type="props.inputType"
        >
      </template>
      <span class="after-icon">
        <slot
          name="afterIcon"
        />
      </span>
      <span class="second-after-icon">
        <slot name="secondAfterIcon" />
      </span>
    </label>
    <span
      v-if="props.error && props.errorText"
      class="input-error"
    >
      {{ errorText }}
    </span>
    <span
      v-if="props.descriptionText"
      class="input-description-text"
    >
      {{ props.descriptionText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useSlots } from 'vue';

const mainInput = ref();
const slots = useSlots();
const emit = defineEmits(['onChange', 'onFocus', 'onInput', 'update:modelValue']);

function onInput(ev: Event) {
  emit('onInput', (ev.target as HTMLInputElement).value);
  emit('update:modelValue', (ev.target as HTMLInputElement).value);
}

function onFocus(ev: Event) {
  emit('onFocus', (ev.target as HTMLInputElement).value);
}

function onChange(ev: Event) {
  emit('onChange', (ev.target as HTMLInputElement).value);
}

interface Props {
  modelValue?: string | undefined;
  placeholder?: string;
  size?: 's' | 'm';
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
  descriptionText?: string;
  autocomplete?: 'on' | 'off';
  textarea?: boolean;
  filepicker?: boolean;
  fileName?: string;
  textareaRows?: string;
  tabindex?: string;
  initAutoFocus?: boolean;
  type?: 'default' | 'ghost';
  inputType?: string;
  inputId?: string;
}
const props = withDefaults(defineProps<Props>(), {
  size: 'm',
  type: 'default',
  inputType: 'text',
  textareaRows: '5',
  tabindex: '5',
  autocomplete: 'off',
  textarea: false,
  filepicker: false,
  placeholder: '',
  errorText: '',
  descriptionText: '',
  fileName: '',
  inputId: '',
  modelValue: ''
});

onMounted(() => {
  if (props.initAutoFocus) {
    setTimeout(() => {
      mainInput.value.click();
      mainInput.value.focus();
    }, 1);
  }
});
</script>

<style scoped lang="scss">
$sizes: (
    "s" var(--vertical-60) var(--horizontal-snudge) 14px,
    "m" var(--vertical-100) var(--horizontal-snudge) 14px,
);
@each $size, $verticalPadding, $horizontalPadding, $fontSize in $sizes {
  .input-size-#{$size} {
    input, .input {
      font-size: $fontSize;
      padding: $verticalPadding $horizontalPadding;
    }
  }
}

$types: (
    'default' var(--surface-primary-default) var(--foreground-primary) var(--borders-primary-rest)
              transparent transparent var(--borders-primary-hover)
              transparent transparent var(--borders-brand)
              var(--surface-tetrady-pressed) var(--foreground-brand-pressed) transparent
              var(--foreground-disabled) var(foreground-disabled) transparent,
    'ghost' transparent var(--foreground-secondary) transparent
              transparent transparent transparent
              transparent transparent var(--borders-brand)
              transparent var(--foreground-primary) transparent
              transparent transparent transparent,
);
@each $type, $bgColor, $color, $borderColor,
             $hoverBgColor, $hoverColor, $hoverBorderColor,
             $focusBgColor, $focusColor, $focusBorderColor,
             $activeBgColor, $activeColor, $activeBorderColor,
             $disabledBgColor, $disabledColor, $disabledBorderColor in $types {
  .input-type-#{$type} {
    background-color: $bgColor;
    color: $color;
    border: var(--thick) solid $borderColor;
    &:hover {
      border-color: $hoverBorderColor;
    }
    &:focus {
      @if $type == 'ghost' {
        border-top-color: transparent;
        border-bottom-color: $focusBorderColor;
      } @else {
        border-color: $focusBorderColor;
      }
    }
    &:focus-visible {
      @if $type == 'ghost' {
        border-top-color: transparent;
        border-bottom-color: $focusBorderColor;
      } @else {
        border-color: $focusBorderColor;
      }
      outline: none;
    }
    &:active {
      color:  $activeColor;
      background-color: $activeBgColor;
      outline: none;
    }
    &:disabled {
      opacity: .5;
      color: $disabledColor;
    }
  }
}

.input {
  width: 100%;
  border-radius: var(--m);
  font-size: 14px;
  transition: .2s;
  margin: 0;

  &-wrapper {
    position: relative;
    width: 100%;
    &.error {
      .input {
        border-width: 1px;
        border-color: var(--borders-error);
      }
    }
  }

  &-before-icon {
    position: relative;
    .before-icon {
      position: absolute;
      display: flex;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%)
    }
    .input {
      padding-left: 35px;
    }
  }

  &-after-icon {
    position: relative;
    .after-icon {
      position: absolute;
      display: flex;
      top: 50%;
      right: 10px;
      transform: translate(0, -50%)
    }
    .input {
      padding-right: 35px;
    }
  }

  &-second-after-icon {
    position: relative;
    .second-after-icon {
      position: absolute;
      display: flex;
      top: 50%;
      right: 10px;
      transform: translate(0, -50%)
    }
    .after-icon {
      position: absolute;
      display: flex;
      top: 50%;
      right: 35px;
      transform: translate(0, -50%)
    }
    .input {
      padding-right: 60px;
    }
  }

  &-label {
    width: 100%;
    margin: 0;
  }

  &-error {
    display: block;
    margin-top: var(--vertical-40);
    color: var(--foreground-error);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  &-description-text {
    display: block;
    margin-top: var(--vertical-40);
    color: var(--foreground-secondary);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  &.file {
    position: relative;
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    input {
      visibility: hidden;
      position: absolute;
    }
  }
}
</style>
