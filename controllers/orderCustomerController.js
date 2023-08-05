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

  // 상품 주문 수정
  modifyOrderCustomer = async (req, res) => {
    try {
      const { orderCustomerId } = req.params;
      const { orderState } = req.body;

      const orderCustomerData =
        await this.orderCustomerService.modifyOrderCustomer(
          orderCustomerId,
          orderState
        );
      if (orderCustomerData === false) {
        return res.status(200).json({ message: '주문을 취소하였습니다.' });
      }
      return res.status(200).json({ message: '주문을 완료하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ messge: 'Server Error' });
    }
  };
}

module.exports = OrderCustomerController;
