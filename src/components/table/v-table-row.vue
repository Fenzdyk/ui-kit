<template>
  <tbody class="table-body">
    <tr
      v-for="(item, idx) in props.data"
      :key="idx"
    >
      <td>{{ item.vin }}</td>
      <td>{{ item.login }}</td>
      <td>{{ item.group }}</td>
    </tr>
  </tbody>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});
</script>

<style scoped lang="scss">
.table {
  p {
    margin-bottom: 0;
  }
  span {
    font-family: Roboto;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0;
    text-align: left;
    color: #AAABAD;
  }
  &-body {
    border-top: none;
    td {
      border-bottom: 1px solid #E9EAEA;
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 0;
      text-align: left;
      padding: 12px 20px;
    }
  }
}

</style>
