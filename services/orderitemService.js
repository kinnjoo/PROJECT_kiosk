const OrderItemRepository = require('../repositories/orderitemRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');
const Enum = require('../config/enum.js');

class OrderItemService {
  orderItemRepository = new OrderItemRepository();

  // 상품 발주 유효성 검증
  validationMakeOrder = async (itemId, amount) => {
    if (!amount) {
      throw new MakeError(400, '발주 수량을 입력해주세요.');
    }

    if (isNaN(itemId) || itemId < 0) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    const findItemData = await this.orderItemRepository.findOneItemByCondition({
      id: itemId,
    });
    if (!findItemData) {
      throw new MakeError(400, '존재하지 않는 상품입니다.');
    }

    return;
  };

  // 상품 발주
  makeOrder = async (itemId, amount) => {
    await this.validationMakeOrder(itemId, amount);
    await this.orderItemRepository.makeOrder({ itemId, amount });
    return true;
  };

  // 발주 상태 수정 유효성 검증
  validationModifyOrderItemState = async (itemId, id, state) => {
    const values = Object.values(Enum.orderItemState);

    if (!state || !values.includes(state)) {
      throw new MakeError(400, '잘못된 발주 상태입니다.');
    }

    if (isNaN(itemId) || isNaN(id) || itemId < 0 || id < 0) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    return;
  };

  // 발주 상태 수정
  modifyOrderItemState = async (itemId, id, state) => {
    await this.validationModifyOrderItemState(itemId, id, state);

    const findOrderItemData =
      await this.orderItemRepository.findOneOrderItemByCondition({
        id,
        itemId,
      });

    if (!findOrderItemData) {
      throw new MakeError(400, '존재하지 않는 상품 발주 내역입니다.');
    }

    const findItemData = await this.orderItemRepository.findOneItemByCondition({
      id: itemId,
    });

    if (findOrderItemData.state === 'ordered' && state === 'completed') {
      throw new MakeError(400, "현 발주상태가 'pending'일때만 가능합니다.");
    }

    const itemAmount = findItemData.amount;
    const orderAmount = findOrderItemData.amount;

    if (findOrderItemData.state === 'pending' && state === 'completed') {
      await this.orderItemRepository.modifyQuantityWhenCompleted(
        itemId,
        id,
        state,
        itemAmount,
        orderAmount
      );
    } else if (
      findOrderItemData.state === 'completed' &&
      findOrderItemData.state !== state
    ) {
      if (orderAmount >= itemAmount) {
        throw new MakeError(
          400,
          '현재 수량이 발주 수량보다 적어 발주 취소가 불가능합니다.'
        );
      }
      await this.orderItemRepository.modifyQuantityWhenNonCompleted(
        itemId,
        id,
        state,
        itemAmount,
        orderAmount
      );
      return true;
    }
    await this.orderItemRepository.modifyOrderItemState({ state }, { id });
    return true;
  };
}

module.exports = OrderItemService;
