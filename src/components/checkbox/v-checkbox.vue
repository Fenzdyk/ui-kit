<template>
  <label
    class="checkbox"
    :class="[{ disabled: props.disabled }, props.classAdded]"
  >
    <input
      class="form-check-input"
      :id="props.id"
      type="checkbox"
      :checked="modelValue"
      @click="onClick"
      @change="(ev) => {
        $emit('onChange', ev)
        $emit('update:modelValue', ev.target.checked)
      }"
    >
    <span
      class="checkbox-content"
      :class="{ interminate: props.interminate, check: modelValue }"
    >
      <span
        v-if="modelValue"
        class="check-icon"
      >
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.00407 0.925747C9.32228 1.19092 9.36527 1.66384 9.10009 1.98205L4.56884
            7.41955C4.43394 7.58143 4.23717 7.67909 4.02666 7.68864C3.81616 7.69819 3.61135 7.61875 3.46235
            7.46974L0.743598 4.75099C0.450702 4.4581 0.450702 3.98323 0.743598 3.69033C1.03649 3.39744 1.51136
            3.39744 1.80426 3.69033L3.94228 5.82835L7.94776 1.02177C8.21294 0.703564 8.68586 0.660571 9.00407 0.925747Z"
            fill="#512E2E"
          />
        </svg>

      </span>
      <template v-else>
        <template v-if="props.interminate">
          <span class="interminate-icon" />
        </template>
        <template v-else>
          <span class="empty-icon" />
        </template>
      </template>

    </span>
    <span
      class="checkbox-text"
      :class="{ 'interminate-text': props.interminate, 'check-text': props.checkedCheckbox }"
    >
      {{ text }}
    </span>
  </label>
</template>

<script setup>
const emit = defineEmits(['update:modelValue', 'onChange', 'onClick']);
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  id: {
    type: String,
    default: ''
  },
  interminate: {
    type: Boolean,
    default: () => false
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  size: {
    type: String,
    default: () => 'l'
  },
  text: {
    type: String,
    default: () => ''
  },
  classAdded: {
    type: String,
    default: () => ''
  }
});

function onClick(ev) {
  emit('onClick', ev);
}
</script>

<style scoped lang="scss">
.checkbox {
  margin: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  input {
    display: none;
  }
  &-content {
    display: inline-flex;
    width: 18px;
    height: 18px;
    border: 1px solid var(--foreground-secondary);
    border-radius: 3px;
    transition: .2s;
    align-items: center;
    justify-content: space-evenly;
    background-color: white;
  }
  .check {
    border-color: var(--foreground-brand-pressed);
    background-color: var(--foreground-brand-pressed);
    &-icon {
      width: 10px;
      height: 10px;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        path {
          fill: white;
        }
      }
    }
  }
  .interminate {
    border-color: var(--foreground-brand-pressed);
    &-icon {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      display: block;
      background-color: var(--foreground-brand-pressed);
      transition: .2s;
    }
  }
  .empty-icon {
    width: 10px;
    height: 10px;
  }
  &-text {
    color: var(--foreground-secondary);
    margin-left: 5px;
    &.interminate-text {
      color: var(--foreground-brand-pressed);
    }
    &.check-text {
      color: var(--foreground-brand-pressed);
    }
  }
  &:hover {
    .checkbox {
      &-content {
        border-color: var(--foreground-brand-pressed);
        .interminate-icon {
          background-color: var(--foreground-brand-pressed);
        }
      }
      &-text {
        color: var(--foreground-brand-pressed);
      }
    }
  }
}
.disabled {
  .checkbox {
    &-content {
      background-color: var(--foreground-disabled);
      border-color: var(--foreground-disabled);
    }
  }
  &:hover {
    .checkbox {
      &-content {
        background-color: var(--foreground-disabled);
        border-color: var(--foreground-disabled);
      }
    }
  }
}
</style>
