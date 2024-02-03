<template>
  <notifications
    width="460"
    position="bottom right"
    group="defaultNotification"
  >
    <template #body="props">
      <div class="notification">
        <div class="notification-icon">
          <img
            :src="icons[props.item.type]"
            alt="success"
            width="50"
            height="50"
          >
        </div>
        <div class="notification-massage">
          <div class="notification-title">
            {{ props.item.title }}
          </div>
          <div class="notification-text">
            {{ props.item.text }}
          </div>
        </div>
        <v-icon
          class="close"
          size="s"
          name="icn_s_cancel"
          width="20"
          :fill="'var(--foreground-secondary)'"
          @click="props.close"
        />
      </div>
    </template>
  </notifications>
</template>

<script setup>
import { icons } from '@/components/notification/svg-icons';
import VIcon from '@/components/icons/v-icon.vue';
// doc https://github.com/kyvg/vue3-notification
// example props notification object
// {
//   class: 'vue-notification warn',
//   item: {
//     id: 0,
//     title: 'Authorization',
//     text:
//         'You have been logged in!',
//     type: 'warn',
//     state: 0,
//     speed: 300,
//     length: 40600,
//     data: {},
//     timer: 17
//   }
// };
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  align-items: center;
  box-shadow: none;
  border-radius: 16px;
  padding: 16px 32px 16px 16px;
  margin-bottom: 20px;
  width: 450px;
  background-color: var(--surface-primary-default);
  position: relative;

  &-massage {
    margin-left: 20px;
  }

  &-title {
    font-weight: bold;
    font-size: 15px;
    color: var(--foreground-primary);
  }

  &-text {
    font-size: 13px;
    color: var(--foreground-primary);
  }

  .close {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 20px;
    height: 20px;
    color: var(--foreground-primary);
    padding: 0;
    border: none;
    cursor: pointer;
    outline: none;
  }
}
</style>
