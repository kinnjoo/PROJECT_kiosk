const ItemService = require('../services/itemService.js');
const MakeError = require('../untils/makeErrorUtil.js');

class ItemController {
  itemService = new ItemService();

  // 상품 추가
  createItem = async (req, res) => {
    try {
      const { name, price, type } = req.body;
      const createItemData = await this.itemService.createItem(
        name,
        price,
        type
      );

      if (createItemData) {
        return res.status(201).json({ message: '상품을 추가하였습니다.' });
      }
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = ItemController;
