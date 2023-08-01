const OrderItemService = require('../services/orderitemService.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OrderItemController {
  orderItemService = new OrderItemService();

  // 상품 발주
  makeOrder = async (req, res) => {
    try {
      const { itemId } = req.params;
      const { amount } = req.body;

      await this.orderItemService.makeOrder(itemId, amount);

      return res.status(200).json({ message: '상품 발주에 성공하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 발주 상태 수정
  modifyOrderItemState = async (req, res) => {
    try {
      const { itemId, id } = req.params;
      const { state } = req.body;

      await this.orderItemService.modifyOrderItemState(itemId, id, state);
      return res.status(200).json({ message: '발주 상태를 수정하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = OrderItemController;
