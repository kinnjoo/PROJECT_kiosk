const { Items, OrderCustomers, ItemOrderCustomers } = require('../models');

class OrderCustomerRepository {
  // 상품 가격 찾기
  calculatePrice = async (itemId) => {
    const findItemData = await Items.findOne({ where: { id: itemId } });
    const price = findItemData.price;

    return price;
  };

  // 상품 주문
  makeOrder = async (itemId, amount, price) => {
    const orderCustomerData = await OrderCustomers.create();
    const orderCustomerId = orderCustomerData.id;

    const itemOrderCustomerData = await ItemOrderCustomers.create({
      itemId,
      orderCustomerId,
      amount,
      price,
    });

    return itemOrderCustomerData;
  };
}

module.exports = OrderCustomerRepository;
