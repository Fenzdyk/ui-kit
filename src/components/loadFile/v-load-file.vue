<template>
  <label
    :class="{
      dropAreaClass,
      error,
    }"
    class="input-wrapper"
    @drop.prevent="e => uploadFile(e.dataTransfer.files)"
    @dragenter.prevent="dropAreaClass = true"
    @dragover.prevent="dropAreaClass = true"
    @dragleave.prevent="dropAreaClass = false"
  >
    <label
      v-if="!props.loading"
      class="input-file-button"
      for="input-file"
    >
      <v-icon
        size="m"
        :name="props.loadedFileText ? 'icn_m_circle_check' : 'icn_m_upload'"
        :fill="'var(--foreground-secondary)'"
      />
      <span class="input-file-text-main">{{ props.loadedFileText || 'Перетащите файл для загрузки' }}</span>
      <input
        id="input-file"
        class="input input-file"
        name="file"
        type="file"
        @change="event => uploadFile(event.target.files)"
      >
      <span
        v-if="props.error && props.errorText"
        class="error-text"
      >
        {{ errorText }}
      </span>
    </label>
    <v-spinner v-else />
  </label>
</template>

<script setup>

import { ref } from 'vue';
import VIcon from '@/components/icons/v-icon.vue';
import VSpinner from '@/components/spinner/v-spinner.vue';

const dropAreaClass = ref();
const emit = defineEmits(['uploadFile']);
const props = defineProps({
  loading: {
    type: Boolean,
    default: () => false
  },
  loadedFileText: {
    type: String,
    default: () => ''
  },
  error: {
    type: Boolean,
    default: () => false
  },
  errorText: {
    type: String,
    default: () => ''
  }
});

function uploadFile(files) {
  dropAreaClass.value = false;
  emit('uploadFile', files);
}

</script>

<style scoped lang="scss">
.input-wrapper {
  width: 100%;
  height: 104px;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--borders-focus);
  border-radius: 5px;
  cursor: pointer;
  padding: 16px 8px;
  color: var(--foreground-primary);
  .input {
    &-file {
      display: none;
      &-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .icon {
          margin-bottom: 8px;
        }
      }
    }
  }
  &.dropAreaClass {
    border-color: var(--surface-primary-pressed);
  }
  &.error {
    border-color: var(--surface-error-and-status-red-1);
  }

  .error-text {
    display: block;
    margin-top: 4px;
    color: var(--surface-error-and-status-red-1);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }
}
</style>
