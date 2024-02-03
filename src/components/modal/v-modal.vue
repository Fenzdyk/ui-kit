<template>
  <teleport to="body">
    <div class="modal-window">
      <v-spinner v-if="props.loadContend" />
      <div
        v-else
        class="modal-content"
      >
        <v-btn
          v-if="props.closeBtn"
          class="close"
          size="xs"
          color="no-color"
          @click="onClose"
        >
          <template #default>
            <v-icon
              width="20"
              name="icn_s_cancel"
              color="secondary"
              size="s"
            />
          </template>
        </v-btn>
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import VIcon from '@/components/icons/v-icon.vue';
import VBtn from '@/components/buttons/v-btn.vue';
import VSpinner from '@/components/spinner/v-spinner.vue';

const props = defineProps({
  closeBtn: {
    type: Boolean,
    default: () => true
  },
  loadContend: {
    type: Boolean,
    default: () => false
  }
});

const emit = defineEmits(['onClose']);
function onClose() {
  emit('onClose');
}
onMounted(() => {
  document.querySelector('body').classList.add('overflow-hidden');
});
onUnmounted(() => {
  document.querySelector('body').classList.remove('overflow-hidden');
});
</script>

<style scoped lang="scss">
.modal {
  &-window {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 5001;
    background-color: rgba(23, 23, 23, 0.45);;
  }

  &-content {
    display: inline;
    position: relative;
    width: auto;
    border-radius: 8px;
    border: 1px solid var(--borders-secondary);
    background: var(--surface-tetrady-default);
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.12), 0 8px 16px 0 rgba(0, 0, 0, 0.14);
    padding: 24px;
    .close {
      position: absolute;
      top: 22px;
      right: 24px;
    }
  }
}
</style>
