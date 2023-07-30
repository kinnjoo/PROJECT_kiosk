const { OrderItems } = require('../models');

class OrderItemRepository {
  // 상품 발주
  makeOrder = async (makeOrderData) => await OrderItems.create(makeOrderData);
}

module.exports = OrderItemRepository;
