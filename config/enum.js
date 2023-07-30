const itemType = {
  COFFEE: 'coffee',
  JUICE: 'juice',
  FOOD: 'food',
};

const orderItemState = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3,
};

module.exports = { itemType, orderItemState };
