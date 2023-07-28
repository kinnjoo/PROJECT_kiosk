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

  // 상품 전체 리스트 조회
  findAllItemsWithPageNation = async (req, res) => {
    try {
      const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
      const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

      const itemList = await this.itemService.findAllItemsWithPageNation(
        pageSize,
        pageNum
      );

      if (itemList) {
        return res.status(200).json({ itemList });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = ItemController;
