<template>
  <div
    class="message-bar"
    :class="props.type"
  >
    <v-icon
      size="s"
      :name="icons[props.type as keyof typeof icons]"
      width="20"
      class="icon"
    />
    <div>
      <p class="message-bar-title medium">
        {{ props.title }}
      </p>
      <p class="message-bar-text">
        {{ props.text }}
      </p>
      <ul class="message-bar-list">
        <li
          v-for="(item, idx) in props.list"
          :key="idx"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import VIcon from '@/components/icons/v-icon.vue';

interface Props {
  title: string
  text?: string
  list?: string[]
  type: string
}
const props = defineProps<Props>();

interface Iicons {
  success: string
  warning: string
  error: string
}
const icons: Iicons = {
  success: 'icn_s_status_done',
  warning: 'icn_s_warning',
  error: 'icn_s_status_error'
};
</script>

<style scoped lang="scss">
.message-bar {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: var(--horizontal-snudge);
  border-radius: var(--m);
  padding: var(--vertical-mnudge);
  border: var(--thin) solid transparent;
  margin:2px;
  &.success {
    border-color: var(--borders-positive);
    svg {
      &:deep(path) {
        fill: var(--borders-positive);
      }
    }
  }
  &.warning {
    border-color: var(--borders-warning);
    svg {
      &:deep(path) {
        fill: var(--borders-warning);
      }
    }
  }
  &.error {
    border-color: var(--borders-error);
    svg {
      &:deep(path) {
        fill:  var(--borders-error);
      }
    }
  }
  &-title {
    margin-bottom: 4px;
    color: var(--foreground-primary);
  }
  &-text {
    color: var(--foreground-secondary);
    margin: 0;
  }
  &-list {
    color: var(--foreground-secondary);
    margin: 0;
    padding-left: 13px;
  }
}
</style>
