export const isFilterPresented = (data, filter) => {
  const flattened = [...data].flat();
  return flattened.findIndex((f) => f === filter) > -1;
};

export const getFilterIndexes = (data, filter) => {
  const filterArrIndex = data.findIndex(
    (item) => item.findIndex((f) => f === filter) > -1
  );
  const filterIndex = data[filterArrIndex].findIndex((f) => f === filter);
  return { filterArrIndex, filterIndex };
};
