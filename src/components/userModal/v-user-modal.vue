<template>
  <v-modal
    v-if="showModal"
    :load-contend="userInfoLoad"
  >
    <div
      class="user-modal"
      ref="userModal"
    >
      <h4>Информация о пользователе</h4>
      <div class="user-modal-info">
        <span>Имя</span>
        <span>{{ userInfo.first_name || '-' }}</span>
        <span>Фамилия</span>
        <span>{{ userInfo.last_name || '-' }}</span>
        <span>Email</span>
        <span>{{ userInfo.email || '-' }}</span>
        <span>Логин </span>
        <span>{{ userInfo.username || '-' }}</span>
      </div>
    </div>
  </v-modal>
</template>

<script setup>

import { onClickOutside } from '@vueuse/core/index';
import { ref } from 'vue';
import VModal from '@/components/modal/v-modal.vue';
import { emitter } from '@/helpers/emitter';
import { useUserStore } from '@/stores/user.store';

const userModal = ref();
const showModal = ref(false);
const userInfoLoad = ref(false);
const userInfo = ref({});
const store = useUserStore();

function showUserInfo({ userId }) {
  userInfo.value = {};
  showModal.value = true;
  if (typeof store.users[userId] !== 'undefined') {
    userInfo.value = store.users[userId];
  } else {
    userInfoLoad.value = true;
    store.getUserInfo(userId).then(() => {
      userInfo.value = store.users[userId];
    }).catch(() => {
      showModal.value = false;
    }).finally(() => {
      userInfoLoad.value = false;
    });
  }
}

function closeModal() {
  showModal.value = false;
}

onClickOutside(userModal, closeModal);

emitter.on('showUserInfo', userId => showUserInfo(userId));
emitter.on('closeUserInfo', closeModal);

</script>

<style scoped lang="scss">
.user-modal {
  min-width: 432px;
  h4 {
    margin-bottom: 16px;
  }
  &-info {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-row-gap: 8px;
    grid-column-gap: 85px;
    span:nth-child(2n) {
      color: var(--foreground-secondary);
    }
  }
}
</style>
