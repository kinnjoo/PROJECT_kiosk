const OrderCustomerRepository = require('../repositories/orderCustomerRepository.js');
const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OrderCustomerService {
  orderCustomerRepository = new OrderCustomerRepository();
  itemRepository = new ItemRepository();

  // 상품 주문 유효성 검증
  validationMakeOrderCustomer = async (itemId, amount) => {
    if (!amount) {
      throw new MakeError(400, '수량을 입력해주세요', 'invalid request');
    }

    const findItemData = await this.itemRepository.findOneItemByCondition({
      id: itemId,
    });

    if (!findItemData) {
      throw new MakeError(400, '존재 하지 않는 상품입니다.', 'invalid request');
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
}

module.exports = OrderCustomerService;
