const { Items, OrderItems, sequelize } = require('../models');
const { Transaction } = require('sequelize');

class OrderItemRepository {
  // 상품 발주
  makeOrder = async (makeOrderData) => await OrderItems.create(makeOrderData);

  // DB에서 상품 발주 데이터 찾기
  findOneOrderItemByCondition = async (condition) =>
    await OrderItems.findOne({ where: condition });

  updateOrderItemAmount = async (itemId, id, state, orderAmount) => {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const findItemData = await Items.findOne({ where: { id: itemId } });
      const updatedAmount = findItemData.amount + orderAmount;

      await Items.update(
        { amount: updatedAmount },
        {
          where: { id: itemId },
        }
      ),
        { transaction };

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
