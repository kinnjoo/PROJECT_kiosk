const { Items, OrderItems, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderItemRepository {
  // DB에서 item 데이터 찾기
  findOneItemByCondition = async (condition) =>
    await Items.findOne({ where: condition });

  // 상품 발주
  makeOrder = async (makeOrderData) => await OrderItems.create(makeOrderData);

  // DB에서 상품 발주 데이터 찾기
  findOneOrderItemByCondition = async (condition) =>
    await OrderItems.findOne({ where: condition });

  // 발주 상태 pending -> completed 변경시
  modifyQuantityWhenCompleted = async (
    itemId,
    id,
    state,
    itemAmount,
    orderAmount
  ) => {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const updatedAmount = itemAmount + orderAmount;

      await Items.update(
        { amount: updatedAmount },
        {
          where: { id: itemId },
        },
        { transaction }
      );

      await OrderItems.update({ state }, { where: { id } }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };

  // 발주 상태 completed -> canceled or pending or ordered 변경시
  modifyQuantityWhenNonCompleted = async (
    itemId,
    id,
    state,
    itemAmount,
    orderAmount
  ) => {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const updatedAmount = itemAmount - orderAmount;

      await Items.update(
        { amount: updatedAmount },
        {
          where: { id: itemId },
        },
        { transaction }
      ),
        await OrderItems.update({ state }, { where: { id } }, { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  };

  // 발주 상태 수정
  modifyOrderItemState = async (state, id) =>
    await OrderItems.update(state, { where: id });
}

module.exports = OrderItemRepository;
