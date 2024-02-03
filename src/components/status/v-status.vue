<template>
  <span class="status">
    <v-icon
      :class="colorIcon"
      width="20"
      :name="iconsName[props.type]"
      size="s"
    />
    <span>
      {{ props.text }}
    </span>
  </span>
</template>

<script setup>
import { ref } from 'vue';
import VIcon from '@/components/icons/v-icon.vue';

const iconsName = {
  done: 'icn_s_status_done',
  progress: 'icn_s_status_progress',
  error: 'icn_s_status_error'
};

const colorIcon = ref();

const props = defineProps({
  type: {
    type: String,
    default: () => 'default'
  },
  text: {
    type: String,
    default: () => ''
  }
});

switch (props.type) {
  case 'done':
    colorIcon.value = 'done';
    break;
  case 'progress':
    colorIcon.value = 'progress-icon';
    break;
  case 'error':
    colorIcon.value = 'error';
    break;

  default:
    break;
}
</script>

<style scoped lang="scss">
.status {
  display: flex;
  align-items: center;
  &:deep(.done) {
      fill: var(--surface-error-and-status-green-1);
  }
  &:deep(.progress-icon) {
    fill: var(--surface-error-and-status-yellow-1);
  }
  &:deep(.error) {
    fill: var(--surface-error-and-status-red-1);
  }
  span {
    margin-bottom: 3px;
    margin-left: 4px;
  }
}
</style>
