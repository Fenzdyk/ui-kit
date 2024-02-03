<template>
  <div class="spinner" />
</template>

<style scoped lang="scss">
.spinner {
  position: relative;
  width: 50px;
  height: 50px;
  animation: anim-spin 1s infinite ease;
}

.spinner:after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-top: solid 5px var(--foreground-brand-default);
  border-right: solid 5px transparent;
  border-bottom: solid 5px var(--foreground-brand-default);
  border-left: solid 5px transparent;
  border-radius: 100%;
}

@keyframes anim-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

</style>
