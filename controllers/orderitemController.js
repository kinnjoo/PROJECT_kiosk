const OrderItemService = require('../services/orderitemService.js');
const MakeError = require('../untils/makeErrorUtil.js');

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
}

module.exports = OrderItemController;
