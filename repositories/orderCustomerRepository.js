const {
  Items,
  OrderCustomers,
  ItemOrderCustomers,
  sequelize,
} = require('../models');
const { Transaction } = require('sequelize');

class OrderCustomerRepository {
  // DB에서 item 찾기
  findOneItemByCondition = async (condition) =>
    await Items.findOne({ where: condition });

  // 상품 주문 - OrderCustomers 테이블(주문 번호)
  makeOrderCustomer = async (transaction) =>
    await OrderCustomers.create({}, { transaction });

  // 상품 주문 - ItemOrderCustomers 테이블
  makeItemOrderCustomer = async (
    itemId,
    orderCustomerId,
    amount,
    price,
    transaction
  ) =>
    await ItemOrderCustomers.create(
      { itemId, orderCustomerId, amount, price },
      { transaction }
    );

  // OrderCustomers 데이터 찾기
  findOneOrderCustomerById = async (orderCustomerId) =>
    await OrderCustomers.findOne({ where: { id: orderCustomerId }, raw: true });

  // 상품 주문 수정 - 주문 완료시
  modifyOrderCustomer = async (orderCustomerId) => {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      await OrderCustomers.update(
        { state: true },
        { where: { id: orderCustomerId } },
        { transaction }
      );

      const itemOrderCustomersData = await ItemOrderCustomers.findAll(
        {
          attributes: ['itemId', 'amount'],
          include: [
            {
              model: Items,
              attributes: ['id', 'amount'],
            },
          ],
          where: {
            orderCustomerId,
          },
          raw: true,
        },
        { transaction }
      );

      for (let data = 0; data < itemOrderCustomersData.length; data++) {
        const orderItemId = itemOrderCustomersData[data].itemId;
        const orderAmount = itemOrderCustomersData[data].amount;
        const itemAmount = itemOrderCustomersData[data]['Item.amount'];

        await Items.update(
          { amount: itemAmount - orderAmount },
          { where: { id: orderItemId } },
          { transaction }
        );
      }
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };

  // 상품 주문 수정 - 주문 취소시
  cancelOrderCustomer = async (orderCustomerId) => {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      await OrderCustomers.destroy(
        { where: { id: orderCustomerId } },
        { transaction }
      );
      await ItemOrderCustomers.destroy(
        { where: { orderCustomerId } },
        { transaction }
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };
}

module.exports = OrderCustomerRepository;
