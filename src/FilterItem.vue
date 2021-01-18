<template>
  <div class="filter-item-container">
    <div class="filter-item">
      {{ filterName }}
      <button @click="onDeleteClick(filterName)">&times;</button>
      <button @click="onMoveFilterDown(filterName)" class="down-btn">
        &#x2193;
      </button>
    </div>
    <input type="text" @blur="handleBlur($event, filterName)" />
  </div>
</template>

<script>
export default {
  props: {
    filterName: String,
    onDeleteClick: Function,
    onSubInput: Function,
    onMoveFilterDown: Function,
  },
  methods: {
    handleBlur($event, filterName) {
      this.onSubInput($event, filterName);
      event.target.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item-container {
  display: flex;
  margin-top: 5px;
  .filter-item {
    display: flex;
    min-width: 100px;
    border: 1px solid gray;
    justify-content: space-around;
  }
  input {
    border: none;
    outline: none;
    width: 10px;
    transition: all 0.2s;
    &:focus {
      border: 1px solid gray;
      width: 60px;
    }
  }
}
</style>
