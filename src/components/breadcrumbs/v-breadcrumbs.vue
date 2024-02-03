<template>
  <div class="breadcrumbs">
    <span class="breadcrumbs-brand">
      <v-icon
        width="16"
        name="icn_xs_cloud"
        size="xs"
        :fill="'var(--foreground-disabled)'"
      />
      <span class="breadcrumbs-brand-text">
        Cloud
      </span>
      <span
        class="breadcrumbs-separator"
        v-if="pathArray.length"
      >/</span>
    </span>
    <div
      class="breadcrumbs-item"
      v-for="(item, idx) in pathArray"
      :key="idx"
    >
      <div
        v-if="item?.to"
        class="breadcrumbs-item-link"
      >
        <router-link
          :to="item.to"
        >
          {{ item.text }}
        </router-link>
        <span class="breadcrumbs-separator">/</span>
      </div>
      <span v-else>{{ item.text }}</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import VIcon from '@/components/icons/v-icon.vue';

const router = useRouter();
const route = useRoute();
const pathArray = ref([]);

function getBreadCrumbs() {
  pathArray.value = route.meta.breadCrumbs ? route.meta.breadCrumbs(route) : [];
}

router.afterEach(() => {
  getBreadCrumbs();
});
getBreadCrumbs();
</script>

<style scoped lang="scss">
.breadcrumbs {
  display: flex;
  align-items: center;
  &-item {
    display: inline;
    margin-right: 5px;
    color: var(--foreground-secondary);
    a, span {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      color: var(--foreground-secondary);
    }
    &-link {
      display: inline;
    }
  }
  &-brand {
    display: flex;
    align-items: center;
    color: var(--foreground-disabled, #505050);
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    &-text {
      margin-bottom: -1px;
      margin-left: 4px;
    }
  }
  &-separator {
    margin: 0 16px;
  }
}
</style>
