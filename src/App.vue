<template>
  <div class="filters-container">
    <div
      class="filters-row"
      v-for="filtersArr in filters"
      :key="JSON.stringify(filtersArr)"
    >
      <FilterItem
        v-for="filter in filtersArr"
        :key="filter"
        :filterName="filter"
        :onDeleteClick="handleDeleteClick"
        :onSubInput="handleSubInput"
        :onMoveFilterDown="handleMoveFilterDown"
      />
    </div>
    <MainFilterInput :onMainFilterInputAdd="handleMainFilterInputAdd" />
  </div>
</template>

<script>
import FilterItem from "./FilterItem";
import MainFilterInput from "./MainFilterInput";
import { isFilterPresented, getFilterIndexes } from "./utils";

export default {
  components: { FilterItem, MainFilterInput },
  data() {
    return {
      filters: [[]],
    };
  },
  methods: {
    handleDeleteClick(filter) {
      const { filterArrIndex, filterIndex } = getFilterIndexes(
        this.filters,
        filter
      );
      this.filters[filterArrIndex].splice(filterIndex, 1);
    },
    handleMainFilterInputAdd(value) {
      if (value.length > 0 && !isFilterPresented(this.filters, value)) {
        const filtersLength = this.filters.length;
        this.filters[filtersLength - 1].push(value);
      }
    },
    handleSubInput(event, filter) {
      const {
        target: { value },
      } = event;
      if (value.length > 0 && !isFilterPresented(this.filters, value)) {
        const { filterArrIndex, filterIndex } = getFilterIndexes(
          this.filters,
          filter
        );
        this.filters[filterArrIndex].splice(filterIndex + 1, 0, value);
      }
    },
    handleMoveFilterDown(filter) {
      const { filterArrIndex, filterIndex } = getFilterIndexes(
        this.filters,
        filter
      );
      if (
        this.filters[filterArrIndex].length === 1 &&
        !this.filters[filterArrIndex + 1]
      )
        return;
      const updatedFilters = [...this.filters];
      updatedFilters[filterArrIndex].splice(filterIndex, 1);
      if (Array.isArray(updatedFilters[filterArrIndex + 1])) {
        updatedFilters[filterArrIndex + 1].push(filter);
      } else {
        updatedFilters[filterArrIndex + 1] = [];
        updatedFilters[filterArrIndex + 1].push(filter);
      }
      this.filters = updatedFilters;
    },
  },
  updated() {
    const isEmptyFiltersArr = this.filters.some((f) => f.length === 0);
    if (isEmptyFiltersArr && this.filters.length !== 1) {
      this.filters = this.filters.filter((f) => f.length !== 0);
    }
  },
};
</script>

<style lang="scss" scoped>
.filters-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 800px;
  height: 400px;
  border: 1px solid gray;
  position: relative;
}
.filters-row {
  display: flex;
  flex-wrap: wrap;
  &:not(:first-child) {
    margin-top: 20px;
    border-top: 3px solid red;
  }
}
</style>
