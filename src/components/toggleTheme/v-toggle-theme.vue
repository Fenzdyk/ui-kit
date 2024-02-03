<template>
  <div
    class="theme-selector-wrapper"
    :class="{ dark: !theme.theme, light: theme.theme }"
  >
    <label class="theme-selector">
      <input
        type="checkbox"
        v-model="theme.theme"
        @change="theme.toggleTheme"
      >
      <span class="theme-selector-icon" />
    </label>
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/theme.store';

const theme = useThemeStore();
</script>

<style scoped lang="scss">
.theme-selector {
  background-color: var(--surface-primary-default);
  box-shadow: 0 0 8px -5px var(--surface-inverted) inset;
  width: 80px;
  margin-bottom: 0;
  height: 32px;
  border-radius: 46px;
  &-wrapper {
    position: relative;
    height: 32px;
    margin-left: 10px;
  }
  &-icon {
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 100%;
    left: 6px;
    top: 50%;
    transition: .5s;
    transform: translate(0, -50%);
    cursor: pointer !important;
  }
  input {
    opacity: 0;
  }
}
.dark {
  .theme-selector-icon {
    background: url("./moon-line-icon.svg");
    background-size: 16px;
    background-color: var(--surface-primary-default);
    background-repeat: no-repeat;
    background-position: center;
    left: calc(100% - 31px);
  }
}

.light {
  .theme-selector-icon {
    background: url("./day-sunny-icon.svg");
    background-color: var(--surface-primary-default);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20px;
    left: 6px;
  }
}
</style>
