<template>
  <div class="change-modal">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
    >
      <path
        d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4
            24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
        fill="#3451B2"
      />
    </svg>
    <p class="subtitle">
      Данные не будут сохранены
    </p>
    <div class="d-flex justify-content-end">
      <v-btn
        @click="cancel"
        text="Отменить"
        color="primary"
        class="mr-3"
      />
      <v-btn
        @click="confirm"
        text="Хорошо"
        color="accent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VBtn from '@/components/buttons/v-btn.vue';

const emit = defineEmits(['confirm', 'cancel']);

function confirm() {
  emit('confirm');
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped lang="scss">
.change-modal {
  width: 480px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  svg {
    margin-bottom: 16px;
  }
  p {
    margin-bottom: 32px;
  }
}
</style>
