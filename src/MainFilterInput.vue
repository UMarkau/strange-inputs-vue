<template>
  <div class="main-filter-container">
    <input type="text" v-model="text" />
    <button @click="onMainFilterInputAdd(text)">add</button>
  </div>
</template>

<script>
export default {
  props: {
    onMainFilterInputAdd: Function,
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.main-filter-container {
  display: flex;
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
