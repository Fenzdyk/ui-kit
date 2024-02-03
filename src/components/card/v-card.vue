<template>
  <div class="card">
    <slot name="card-content" />
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 12px;
  background-color: var(--surface-tetrady-default);
  border-color: var(--surface-tetrady-default);
  padding: 16px;
  display: inline-flex;
}
</style>
