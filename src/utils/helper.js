export const getUniqueValues = (arr) => {
  return arr.filter((element, index) => index === arr.indexOf(element));
};

export const getPriceRanges = (arr) => {
  arr = getUniqueValues(arr);
  arr.sort((a, b) => a - b);
  const mIndex1 = Math.floor(arr.length / 3);
  const mIndex2 = Math.floor((arr.length * 2) / 3);
  const median1 = Math.round(arr[mIndex1] / 100) * 100;
  const median2 = Math.round(arr[mIndex2] / 100) * 100;
  return [
    [0, median1],
    [median1, median2],
    [median2, 1000000],
  ];
};
