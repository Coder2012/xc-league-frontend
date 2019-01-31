export const getDatesCount = data => {
  let dataReduced = data.reduce((itemsArray, item) => {
    itemsArray[item] = {
      date: item,
      count:
        (itemsArray[item] && itemsArray[item].count
          ? itemsArray[item].count
          : 0) + 1
    };
    return itemsArray;
  }, []);

  return Object.keys(dataReduced).map(item => dataReduced[item]);
};
