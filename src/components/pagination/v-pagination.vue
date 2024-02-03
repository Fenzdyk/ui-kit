<template>
  <div class="pagination">
    <ul>
      <li
        class="btn-prev"
      >
        <v-btn
          size="s"
          color="ghost"
          @click="prevPage"
          :disabled="page === 0"
        >
          <template #icon>
            <v-icon
              width="20"
              name="pagination-arrow-left"
              color="secondary"
              size="s"
            />
          </template>
        </v-btn>
      </li>
      <li class="pagination-page-counter">
        {{ parseInt(props.paginationObject.page, 10) + 1 }}
      </li>
      <li
        class="btn-next"
      >
        <v-btn
          size="s"
          color="ghost"
          @click="nextPage"
          :disabled="props.itemLength !== parseInt(props.paginationObject.per_page, 10)"
        >
          <template #icon>
            <v-icon
              width="20"
              name="pagination-arrow-right"
              color="secondary"
              size="s"
            />
          </template>
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import VIcon from '@/components/icons/v-icon.vue';
import VBtn from '@/components/buttons/v-btn.vue';

const props = defineProps({
  itemLength: {
    type: Number,
    default: () => 10
  },
  pagination: {
    type: Boolean,
    default: () => true
  },
  paginationObject: {
    type: Object,
    default: () => ({
      page: 0,
      per_page: 10
    })
  }
});

const page = ref(props.paginationObject.page);
const perPage = ref(props.paginationObject.per_page);
const emit = defineEmits(['paginationCallback']);

function paginationCallback() {
  emit('paginationCallback', {
    page: page.value,
    per_page: perPage.value
  });
}

function prevPage() {
  page.value = parseInt(props.paginationObject.page, 10) > 0
    ? parseInt(props.paginationObject.page, 10) - 1 : parseInt(props.paginationObject.page, 10);
  paginationCallback();
}
function nextPage() {
  page.value = props.itemLength === parseInt(props.paginationObject.per_page, 10)
    ? parseInt(props.paginationObject.page, 10) + 1 : parseInt(props.paginationObject.page, 10);
  paginationCallback();
}

watch(() => props.paginationObject, () => {
  page.value = props.paginationObject.page;
}, { deep: true });

</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: end;
  align-items: center;
  padding: 0 10px;
  background-color: var(--surface-primary-default);
  ul {
    .btn {
      &-prev, &-next{
        width: 20px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
    display: flex;
    margin: 0;
    li {
      list-style: none;
      margin: 0 8px;
      cursor: pointer;
    }
  }
  &-page-counter {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
}
</style>
