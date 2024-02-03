<template>
  <div>
    <div
      ref="selectTarget"
      class="select"
    >
      <div
        class="select-wrapper"
        :class="[`input-size-${props.size}`, { error: props.error, 'select-icon': slots.beforeIcon }]"
      >
        <span
          class="select-icon-item"
          v-if="slots.beforeIcon"
        >
          <slot name="beforeIcon" />
        </span>
        <div
          v-if="props.multiple || props.labelFunction"
          class="select-placeholder"
          :class="[{ hidden: searchFlag }]"
        >
          <div class="select-placeholder-content">
            <template v-if="selectedItem.length && props.multiple">
              <span
                v-for="(item, index) in selectedItem"
                :key="index"
              >
                <template v-if="props.labelFunction">
                  {{ props.labelFunction(item) }}
                </template>
                <template v-else>
                  {{ item[props.searchKey] || item }}
                </template>
                <span v-if="index !== selectedItem.length - 1">
                  ,&nbsp;
                </span>
              </span>
            </template>
            <template v-else-if="props.labelFunction">
              <span>
                {{ props.labelFunction(selectedItem) }}
              </span>
            </template>
            <span v-else>
              {{ props.placeholder }}
            </span>
          </div>
        </div>

        <input
          type="text"
          autocomplete="off"
          ref="mainInput"
          id="search"
          class="select-input"
          :class="[{ hidden: !searchFlag && multiple, active: searchFlag }]"
          :placeholder="props.placeholder"
          v-model="searchTerm"
          @click="() => {
            searchFlag = !searchFlag
            searchTerm = ''
            emit('onFocus');
            searchItems()
          }"
          @input="() => {
            emit('onInput');
            searchItems()
          }"
        >
        <span
          class="select-arrow"
          :class="[{ active: searchFlag }]"
        >
          <v-icon
            size="s"
            name="icn_s_arrow"
            width="20"
          />
        </span>
        <ul
          class="select-list"
          v-if="searchFlag"
        >
          <li
            class="select-list-item"
            v-if="props.clearSelect"
          >
            <span
              class="select-list-item-single d-flex align-items-center"
              @click="selectItem('')"
            >
              <v-icon
                class="mr-1"
                size="s"
                width="20"
                name="icn_xs_cancel"
                :fill="'var(--foreground-secondary)'"
              />
              Очистить
            </span>
          </li>
          <li
            class="select-list-item"
            v-for="(item, idx) in itemsList"
            :key="idx"
          >
            <slot name="listIcon" />
            <template v-if="multiple">
              <label class="select-list-item-label">
                <input
                  type="checkbox"
                  :checked="selectedItem
                    .some(itemSelect => {
                      if (props.searchKey) {
                        return itemSelect[props.searchKey] === item[props.searchKey]
                      } else {
                        itemSelect === item
                      }

                    })"
                  @click="selectItem(item)"
                >
                <span class="select-list-item-label-icon">
                  <v-icon
                    size="s"
                    name="icn_s_check_2"
                    width="20"
                  />
                </span>

                <template v-if="props.labelFunction">
                  {{ props.labelFunction(item) }}
                </template>
                <template v-else>
                  {{ item[props.searchKey] || item }}
                </template>

              </label>
            </template>
            <template v-else>
              <span
                class="select-list-item-single"
                @click="selectItem(item)"
              >
                <template v-if="props.labelFunction">
                  {{ props.labelFunction(item) }}
                </template>
                <template v-else>
                  {{ item[props.searchKey] || item }}
                </template>
              </span>
            </template>
          </li>
          <li v-if="!itemsList?.length && searchTerm">
            <span class="ml-3">
              Нет совпадений
            </span>
          </li>
        </ul>
      </div>
    </div>
    <span
      v-if="props.error && props.errorText"
      class="select-error"
    >
      {{ errorText }}
    </span>
  </div>
</template>

<script setup>
import { ref, useSlots, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';
import VIcon from '@/components/icons/v-icon.vue';

const slots = useSlots();
const mainInput = ref();

const emit = defineEmits(['onSelect', 'onFocus', 'onInput']);
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true
  },
  searchKey: {
    type: String,
    default: () => undefined
  },
  multiple: {
    type: Boolean,
    default: () => false
  },
  placeholder: {
    type: String,
    default: () => 'Type here...'
  },
  size: {
    type: String,
    default: () => 's'
  },
  maxItemsToShowInList: {
    type: Number,
    default: () => 0
  },
  searchFunction: {
    type: Function,
    default: undefined
  },
  labelFunction: {
    type: Function,
    default: undefined
  },
  minCharactersToSearch: {
    type: Number,
    default: () => 3
  },
  selectedItemDefault: {
    type: Array,
    default: () => []
  },
  error: {
    type: Boolean,
    default: () => false
  },
  initAutoFocus: {
    type: Boolean,
    default: () => false
  },
  errorText: {
    type: String,
    default: () => ''
  },
  clearSelect: {
    type: Boolean,
    default: () => false
  }
});

const searchFlag = ref(false);
const searchTerm = ref(props.searchKey ? props.selectedItemDefault[props.searchKey] || '' : props.selectedItemDefault || '');
const selectedItem = ref(props.selectedItemDefault);
const itemsList = ref([]);
const dataObject = {
  page: 0,
  per_page: 50,
  key: props.searchKey || ''
};

watch(() => props.selectedItemDefault, () => {
  selectedItem.value = props.selectedItemDefault;
});

const selectTarget = ref();

const selectItem = item => {
  if (props.multiple) {
    const idxItemSelect = selectedItem.value
      .findIndex(el => {
        if (props.searchKey) {
          return el[props.searchKey] === item[props.searchKey];
        }
        return el === item;
      });
    if (idxItemSelect === -1) {
      selectedItem.value.push(item);
    } else {
      selectedItem.value.splice(idxItemSelect, 1);
    }
  } else {
    searchTerm.value = props.searchKey ? item[props.searchKey] : item;
    selectedItem.value = item;
    searchFlag.value = false;
  }
  emit('onSelect', selectedItem.value);
};

function sortForSelectItems(items) {
  return items.sort(item => {
    if (props.searchKey) {
      if (selectedItem.value.some(el => item[props.searchKey] === el[props.searchKey])) {
        return -1;
      }
    } else if (selectedItem.value.some(el => item === el)) {
      return -1;
    }
    return 1;
  });
}

function searchItems() {
  if (searchTerm.value === '' && props.searchFunction === undefined) {
    const items = props.maxItemsToShowInList ? props.items
      .slice(0, props.maxItemsToShowInList) : props.items;
    items.sort(item => item.login);
    itemsList.value = props.multiple ? sortForSelectItems(items) : items;
    return;
  }

  const matches = 0;

  if (props.searchFunction === undefined) {
    itemsList.value = props.items
      .filter(item => {
        if (props.searchKey) {
          return item[props.searchKey].toLowerCase().includes(searchTerm.value.toLowerCase())
          && matches < 10;
        }
        return item.toLowerCase().includes(searchTerm.value) && matches < 10;
      });
    return;
  }

  if (searchTerm.value.length > props.minCharactersToSearch) {
    props.searchFunction({ query: searchTerm.value, ...dataObject }).then(() => {
      itemsList.value = sortForSelectItems(props.items);
    });
  } else {
    props.searchFunction(dataObject).then(() => {
      itemsList.value = sortForSelectItems(props.items);
    });
  }
}

function closeDropdown() {
  searchFlag.value = false;
}

onClickOutside(selectTarget, closeDropdown);
if (props.initAutoFocus) {
  setTimeout(() => {
    mainInput.value.click();
    mainInput.value.focus();
  }, 1);
}

if (props.searchFunction && searchTerm.value.length > props.minCharactersToSearch) {
  props.searchFunction({ query: searchTerm.value, ...dataObject });
}

</script>

<style scoped lang="scss">

$sizes: (
    "s": 32px,
    "m": 40px,
);
@each $size, $height in $sizes {
  .input-size-#{$size} {
    .select-input {
      height: $height;
    }
    .select-placeholder {
      height: $height;
    }
  }
}

.select {
  display: inline-block;
  position: relative;
  width: 100%;

  .hidden {
    opacity: 0;
  }

  &-input {
    border: 1px solid var(--surface-tetrady-default);
    width: 100%;
    height: 100%;
    font-size: 14px;
    background-color: var(--surface-tetrady-default);
    color: var(--foreground-secondary);
    padding-left: 8px;
    border-radius: 4px;
    transition: .2s;
    &.active {
      background-color: var(--surface-tetrady-default);
      border-bottom: 2px solid var(--surface-brand-default);
    }
    &::placeholder {
      color: var(--foreground-secondary);
    }
    &:focus {
      outline: none;
    }
  }

  &-placeholder {
    position: absolute;
    pointer-events: none;
    width: 100%;
    height: 100%;
    font-size: 14px;
    display: flex;
    align-items: center;
    padding-left: 8px;
    border-radius: 4px;
    background-color: var(--surface-tetrady-default);
    color: var(--foreground-secondary);
    border: 1px solid var(--surface-tetrady-default);
    transition: .2s;
    &-content {
      white-space: nowrap;
      overflow: hidden;
      width: calc(100% - 40px);
    }
  }

  &-list {
    position: absolute;
    max-height: 200px;
    overflow-x: hidden;
    z-index: 1;
    list-style: none;
    display: block;
    width: 100%;
    background-color: var(--surface-tetrady-default);
    color: var(--foreground-secondary);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    padding: 10px 0;
    &-item {
      display: flex;
      align-items: center;
      padding: 8px 8px;
      &:hover {
        background-color: var(--surface-tetrady-hover);
      }
      &-label {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        margin-bottom: 0;
        cursor: pointer;
        &-icon {
          &:deep(path) {
            fill: var(--foreground-secondary);
          }
          margin-right: 8px;
          transition: .2s;
          opacity: 0;
        }
        input {
          display: none;
          &:checked + .select-list-item-label-icon{
            margin-right: 8px;
            opacity: 1 !important;
          }
        }
      }
      &-single {
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
    }
  }

  &-wrapper {
    &:hover {
      .select {
        &-input {
          color: var(--foreground-primary);
          background-color: var(--surface-tetrady-hover);
        }
        &-placeholder {
          color: var(--foreground-primary);
          background-color: var(--surface-tetrady-hover);
        }
      }
    }
    &:active {
      .select {
        &-input {
          color: var(--foreground-secondary);
          background-color: var(--surface-tetrady-pressed);
        }
        &-placeholder {
          color: var(--foreground-secondary);
          background-color: var(--surface-tetrady-pressed);
        }
      }
    }
    &.error {
      .select {
        &-input {
          border-color: var(--surface-error-and-status-red-1);
        }
        &-placeholder {
          border-color: var(--surface-error-and-status-red-1);
        }
      }
    }
  }

  &-error {
    display: block;
    margin-top: 4px;
    color: var(--surface-error-and-status-red-1);
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 14px;
  }

  &-icon {
    &-item {
      position: absolute;
      display: flex;
      z-index: 1;
      top: 50%;
      left: 10px;
      transform: translate(0, -50%)
    }
    .select {
      &-input {
        padding-left: 32px;
      }
      &-placeholder {
        padding-left: 32px;
      }
    }
  }

  &-arrow {
    position: absolute;
    pointer-events: none;
    display: flex;
    right: 11px;
    top: 50%;
    transform: translate(0, -50%);
    transition: .2s;
    &.active {
      &:deep(path) {
        fill: var(--surface-brand-default)
      }
      transform: translate(0, -50%) rotate(180deg);
    }
  }
}
</style>
