<template>
  <div class="table-wrapper">
    <table
      class="table"
      v-if="props.data.length || dataLoading"
    >
      <thead>
        <tr class="table-header">
          <th
            v-for="(header, idx) in props.headers"
            :key="idx"
            :colspan="header.colspan ? header.colspan : 1"
            :style="{ width: header.checked ? '63px' : 'auto' }"
          >
            <template v-if="header.checked">
              <v-checkbox
                @onClick="checkAllCallback"
                :interminate="somethingCheck"
                class="check-all"
                :model-value="checkedAllCheckbox"
              />
            </template>
            <template v-else>
              {{ header.name }}
            </template>
          </th>
        </tr>
      </thead>
      <tbody
        class="skeleton"
        v-if="props.dataLoading"
      >
        <tr
          v-for="n in 10"
          :key="n"
        >
          <td
            class="loading"
            v-for="(idx) in props.headers"
            :key="idx"
          >
            <div class="bar">
              <div class="load" />
            </div>
          </td>
        </tr>
      </tbody>
      <slot
        v-else
        name="row"
        :data="props.data"
      />
    </table>
    <div
      class="table-empty-text"
      v-else
    >
      <h2>
        {{ props.emptyDataTitle }}
      </h2>
      <p>
        {{ props.emptyDataText }}
      </p>
    </div>
    <transition name="table-event-items">
      <div
        class="table-event-items"
        v-if="props.selectedItems && props.modalSelected"
      >
        <v-btn
          size="s"
          class="mr-1"
          color="ghost"
          @click="emit('clearAll', ev);"
        >
          <template #beforeIcon>
            <v-icon
              size="s"
              name="icn_s_cancel"
              width="20"
              :fill="'var(--foreground-secondary)'"
            />
          </template>
        </v-btn>
        <span class="table-event-items-counter">
          Выбрано {{ props.selectedItems }}
        </span>
        <slot name="table-events" />
      </div>
    </transition>
  </div>
</template>

<script setup>
import VIcon from '@/components/icons/v-icon.vue';
import VBtn from '@/components/buttons/v-btn.vue';
import VCheckbox from '@/components/checkbox/v-checkbox.vue';

const props = defineProps({
  headers: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  },
  checkedAllCheckbox: {
    type: Boolean,
    default: () => false
  },
  somethingCheck: {
    type: Boolean,
    default: () => false
  },
  selectedItems: {
    type: Number,
    default: () => 0
  },
  modalSelected: {
    type: Boolean,
    default: () => false
  },
  emptyDataTitle: {
    type: String,
    default: () => ''
  },
  emptyDataText: {
    type: String,
    default: () => ''
  },
  dataLoading: {
    type: Boolean,
    default: () => false
  }
});
const emit = defineEmits(['checkAllCallback', 'clearAll']);

function checkAllCallback(ev) {
  emit('checkAllCallback', ev);
}
</script>

<style scoped lang="scss">
.table {
  &-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 1;
    flex-grow: 1;
    position: relative;
    overflow-y: hidden;
    width: calc(100vw - 55px);
  }
  &-header {
    th {
      border: none;
      font-weight: 400;
      font-size: 12px;
      line-height: 14px;
      color: #AAABAD;
      padding: 12px 20px;
    }
  }
  &-empty-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
}
.table-event {
  &-items {
    position: sticky;
    display: flex;
    align-items: center;
    padding: 0 24px;
    height: 56px;
    bottom: 50px;
    width: fit-content;
    margin: 0 auto;
    background-color: var(--surface-primary-default);
    border: 1px solid var(--borders-secondary);
    border-radius: 8px;
    &-counter {
      color: var(--foreground-secondary);
    }
  }
}

.table-event-items-enter-active,
.table-event-items-leave-active {
  transition: 0.3s ease;
  bottom: 50px;
}

.table-event-items-enter-from,
.table-event-items-leave-to {
  opacity: 0;
}

@keyframes loading {
  0% {
    background-position:
        -10% 110%;
  }
  50% {
    background-position: 110% -20%;
  }
  100% {
    background-position: -10% 110%;
  }
}

.skeleton {
  td {
    border: none;
  }
  .loading {
    position: relative;
    .bar {
      height: 17px;
      border-radius: 7px;
      overflow: hidden;
    }

    .load {
      display: block;
      border-radius: 10px;
      width: 100%;
      height: 100%;
      background-image:
          linear-gradient( 100deg, rgba(187, 187, 187, 0), rgba(183, 183, 183, 0.5) 50%, rgba(187, 187, 187, 0) 100% );
      background-size: 200px 24px;
      background-position: 0;
      background-repeat: no-repeat;
      animation: loading 1.2s infinite;
    }
  }
}

</style>
