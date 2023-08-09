const OrderCustomerRepository = require('../repositories/orderCustomerRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');

const { sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();

  // 상품 주문 유효성 검증
  validationMakeOrderCustomer = async (itemId, amount) => {
    if (!amount) {
      throw new MakeError(400, '수량을 입력해주세요');
    }

    if (!itemId) {
      throw new MakeError(400, '주문할 상품을 입력해주세요');
    }

    return;
  };

  // 상품 주문
  makeOrderCustomer = async (order) => {
    let totalPrice = 0;

    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const orderCustomerData =
        await this.orderCustomerRepository.makeOrderCustomer(transaction);
      const orderCustomerId = orderCustomerData.id;

      for (let data = 0; data < order.length; data++) {
        const itemId = order[data].itemId;
        const amount = order[data].amount;

        await this.validationMakeOrderCustomer(itemId, amount);

        const findItemData =
          await this.orderCustomerRepository.findOneItemByCondition({
            id: itemId,
          });

        if (!findItemData) {
          throw new MakeError(400, '존재 하지 않는 상품입니다.');
        }

        if (findItemData.amount < amount) {
          throw new MakeError(
            400,
            '주문 수량이 현재 재고보다 많아 주문이 불가합니다.'
          );
        }

        const price = findItemData.price;

        await this.orderCustomerRepository.makeItemOrderCustomer(
          itemId,
          orderCustomerId,
          amount,
          price,
          transaction
        );

        totalPrice += price * amount;
      }

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }

    return totalPrice;
  };

  // 상품 주문 수정 유효성 검증 - 주문 취소 성공시
  validationModifyOrderCustomer = async (orderState) => {
    if (!orderState) {
      throw new MakeError(400, '주문 상태를 입력해주세요');
    }

    if (orderState !== '완료' && orderState !== '취소') {
      throw new MakeError(400, '알맞은 주문 상태를 입력해주세요');
    }

    return;
  };

  // 상품 주문 수정
  modifyOrderCustomer = async (orderCustomerId, orderState) => {
    await this.validationModifyOrderCustomer(orderState);

    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const findOrderCustomerData =
        await this.orderCustomerRepository.findOneOrderCustomerById(
          orderCustomerId
        );

      if (!findOrderCustomerData) {
        throw new MakeError(400, '존재 하지 않는 주문 내역입니다.');
      }

      if (findOrderCustomerData.state === 1 && orderState === '취소') {
        throw new MakeError(400, '완료된 주문은 취소할 수 없습니다');
      }

      if (orderState === '완료') {
        await this.orderCustomerRepository.modifyOrderCustomerState(
          orderCustomerId,
          transaction
        );

        const itemOrderCustomersData =
          await this.orderCustomerRepository.findAllOrderByOrderCustomerId(
            orderCustomerId
          );

        for (let data = 0; data < itemOrderCustomersData.length; data++) {
          const orderItemId = itemOrderCustomersData[data].itemId;
          const orderAmount = itemOrderCustomersData[data].amount;
          const itemAmount = itemOrderCustomersData[data]['Item.amount'];

          await this.orderCustomerRepository.modifyAmountWhenOrderCompleted(
            orderItemId,
            itemAmount,
            orderAmount,
            transaction
          );
        }

        return true;
      } else if (findOrderCustomerData.state === 0 && orderState === '취소') {
        await this.orderCustomerRepository.deleteOrderCustomerWhenCanceled(
          orderCustomerId,
          transaction
        );

        await this.orderCustomerRepository.deleteItemOrderCustomerWhenCanceled(
          orderCustomerId,
          transaction
        );

        return false;
      }

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };
}

module.exports = OrderCustomerService;
