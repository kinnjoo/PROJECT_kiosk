const OrderCustomerRepository = require('../repositories/orderCustomerRepository.js');
const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();
  itemRepository = new ItemRepository();

  // 상품 주문 유효성 검증
  validationMakeOrderCustomer = async (itemId, amount) => {
    if (!amount) {
      throw new MakeError(400, '수량을 입력해주세요');
    }

    const findItemData = await this.itemRepository.findOneItemByCondition({
      id: itemId,
    });

    if (!findItemData) {
      throw new MakeError(400, '존재 하지 않는 상품입니다.');
    }

    return null;
  };

  // 상품 주문
  makeOrderCustomer = async (order) => {
    const orderCustomerId =
      await this.orderCustomerRepository.makeOrderCustomer();

    for (let data = 0; data < order.length; data++) {
      const itemId = order[data].itemId;
      const amount = order[data].amount;

      await this.validationMakeOrderCustomer(itemId, amount);

      const price = await this.orderCustomerRepository.findOneItemPrice(
        itemId,
        amount
      );

      await this.orderCustomerRepository.makeItemOrderCustomer(
        itemId,
        orderCustomerId,
        amount,
        price
      );
    }

    const totalPrice = await this.orderCustomerRepository.findTotalPrice(
      orderCustomerId
    );

    return totalPrice;
  };

  // 상품 주문 수정 유효성 검증
  validationModifyOrderCustomer = async (orderCustomerId, orderState) => {
    if (!orderState) {
      throw new MakeError(400, '주문 상태를 입력해주세요');
    }

    if (orderState !== '완료' && orderState !== '취소') {
      throw new MakeError(400, '알맞은 주문 상태를 입력해주세요');
    }

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

    return null;
  };

  // 상품 주문 수정
  modifyOrderCustomer = async (orderCustomerId, orderState) => {
    await this.validationModifyOrderCustomer(orderCustomerId, orderState);

    if (orderState === '완료') {
      await this.orderCustomerRepository.modifyOrderCustomer(orderCustomerId);
    }

    const cancelOrderCustomer =
      await this.orderCustomerRepository.cancelOrderCustomer(orderCustomerId);

    return cancelOrderCustomer;
  };
}

module.exports = OrderCustomerService;
