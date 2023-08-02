const {
  Items,
  OrderCustomers,
  ItemOrderCustomers,
  sequelize,
} = require('../models');

class OrderCustomerRepository {
  // Items 데이터 찾기
  findOneItemPrice = async (itemId, amount) => {
    const findItemData = await Items.findOne({ where: { id: itemId } });
    const price = findItemData.price * amount;
    return price;
  };

  // totalPrice
  findTotalPrice = async (orderCustomerId) => {
    const totalPriceData = await ItemOrderCustomers.findAll({
      where: {
        orderCustomerId,
      },
      attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPrice']],
    });
    const totalPrice = totalPriceData[0].dataValues.totalPrice;

    return totalPrice;
  };

  // 상품 주문 - OrderCustomers 테이블
  makeOrderCustomer = async () => {
    const orderCustomerData = await OrderCustomers.create();
    const orderCustomerId = orderCustomerData.id;
    return orderCustomerId;
  };

  // 상품 주문 - ItemOrderCustomers 테이블
  makeItemOrderCustomer = async (itemId, orderCustomerId, amount, price) =>
    await ItemOrderCustomers.create({
      itemId,
      orderCustomerId,
      amount,
      price,
    });
}

module.exports = OrderCustomerRepository;
