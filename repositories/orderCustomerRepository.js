const { Items, OrderCustomers, ItemOrderCustomers } = require('../models');

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

  // 상품 주문 수정 - 주문 완료시 OrderCustomers.state: true
  modifyOrderCustomerState = async (orderCustomerId, transaction) =>
    await OrderCustomers.update(
      { state: true },
      { where: { id: orderCustomerId } },
      { transaction }
    );

  // orderCustomerId별 상품 주문 데이터 찾기
  findAllOrderByOrderCustomerId = async (orderCustomerId) =>
    await ItemOrderCustomers.findAll({
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
    });

  // 상품 주문 완료 - Items 테이블 amount 감소
  modifyAmountWhenOrderCompleted = async (
    orderItemId,
    itemAmount,
    orderAmount,
    transaction
  ) => {
    await Items.update(
      { amount: itemAmount - orderAmount },
      { where: { id: orderItemId } },
      { transaction }
    );
  };

  // 상품 주문 수정 - 주문 취소 성공시 OrderCustomer 데이터 삭제
  deleteOrderCustomerWhenCanceled = async (orderCustomerId, transaction) =>
    await OrderCustomers.destroy(
      { where: { id: orderCustomerId } },
      { transaction }
    );

  // 상품 주문 수정 - 주문 취소 성공시 ItemOrderCustomer 데이터 삭제
  deleteItemOrderCustomerWhenCanceled = async (orderCustomerId, transaction) =>
    await ItemOrderCustomers.destroy(
      { where: { orderCustomerId } },
      { transaction }
    );
}

module.exports = OrderCustomerRepository;
