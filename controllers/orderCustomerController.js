const OrderCustomerService = require('../services/orderCustomerService.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OrderCustomerController {
  orderCustomerService = new OrderCustomerService();

  // 상품 주문
  makeOrder = async (req, res) => {
    try {
      const { order } = req.body;

      const totalPrice = await this.orderCustomerService.makeOrderCustomer(
        order
      );

      return res.status(200).json({
        message: `결제금액은 총 ${totalPrice.toLocaleString()}원입니다.`,
      });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = OrderCustomerController;
