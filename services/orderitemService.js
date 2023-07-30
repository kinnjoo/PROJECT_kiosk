const OrderItemRepository = require('../repositories/orderitemRepository.js');
const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../untils/makeErrorUtil.js');

class OrderItemService {
  orderItemRepository = new OrderItemRepository();
  itemRepository = new ItemRepository();

  // 상품 발주 유효성 검증
  validationMakeOrder = async (itemId, amount) => {
    if (!amount) {
      throw new MakeError(400, '발주 수량을 입력해주세요.', 'invalid request');
    }

    const findItemData = await this.itemRepository.findOneItemByCondition({
      id: itemId,
    });
    if (!findItemData) {
      throw new MakeError(400, '존재하지 않는 상품입니다.', 'invalid request');
    }

    return null;
  };

  // 상품 발주
  makeOrder = async (itemId, amount) => {
    await this.validationMakeOrder(itemId, amount);
    await this.orderItemRepository.makeOrder({ itemId, amount });
    return true;
  };
}

module.exports = OrderItemService;
