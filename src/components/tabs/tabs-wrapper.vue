<template>
  <div class="tabs">
    <ul class="tabs-header">
      <li
        v-for="(title, idx) in tabTitles"
        :key="title"
        class="tabs-item"
        :class="{ selected: selectedTitle === title }"
        @click="selectedTitle = title"
      >
        {{ title }}
        <template v-if="slots.default()[idx].props.count">
          <span class="tabs-count">
            {{ slots.default()[idx].props.count }}
          </span>
        </template>
      </li>
    </ul>
    <slot />
  </div>
</template>

<script setup>
import { useSlots, ref, provide } from 'vue';

const props = defineProps({
  activeTab: {
    type: String,
    default: () => ''
  }
});

const slots = useSlots();
const tabTitles = ref(slots.default().map(tab => tab.props.title));
const selectedTitle = ref(props.activeTab || tabTitles.value[0]);

provide('selectedTitle', selectedTitle);
</script>

<style lang="scss" scoped>
.tabs {
  margin: 0 auto;
  &-header {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 5px;
    text-align: center;
  }
  &-item {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 4px 8px;
    transition: .2s;
    &.selected {
      border-radius: 6px;
      border: 1px solid var(--surface-brand-default);
      color: var(--foreground-primary);
    }
  }
  &-count {
    border-radius: 8px;
    background: var(--surface-tetrady-default);
    color: var(--foreground-primary);
    width: 17px;
    height: 17px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
  }
}
</style>
