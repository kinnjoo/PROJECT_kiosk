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
  makeOrderCustomer = async (itemId, amount) => {
    await this.validationMakeOrderCustomer(itemId, amount);

    const priceData = await this.orderCustomerRepository.calculatePrice(itemId);
    const price = priceData * amount;

    const itemOrderCustomerData =
      await this.orderCustomerRepository.makeOrderCustomer(
        itemId,
        amount,
        price
      );

    return itemOrderCustomerData;
  };
}

module.exports = OrderCustomerService;
