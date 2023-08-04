const ItemService = require('../services/itemService.js');
const MakeError = require('../utils/makeErrorUtil.js');

class ItemController {
  itemService = new ItemService();

  // 상품 추가
  makeItem = async (req, res) => {
    try {
      const { optionId, name, price, type } = req.body;

      await this.itemService.makeItem(optionId, name, price, type);
      return res.status(201).json({ message: '상품을 추가하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 상품 리스트 조회(전체)
  findAllItems = async (req, res) => {
    try {
      const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
      const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);

      const itemList = await this.itemService.findAllItemsWithPagination(
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

  // 상품 리스트 조회(타입별)
  findAllItemsByType = async (req, res) => {
    try {
      const pageSize = Number(req.query.pageSize ? req.query.pageSize : 10);
      const pageNum = Number(req.query.pageNum ? req.query.pageNum : 1);
      const { type } = req.query;

      const itemList = await this.itemService.findAllItemsByTypeWithPagination(
        pageSize,
        pageNum,
        type
      );

      if (itemList) {
        return res.status(200).json({ itemList });
      }
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 상품 삭제
  deleteItem = async (req, res) => {
    try {
      const { id } = req.params;

      await this.itemService.deleteItemById(id);
      return res.status(200).json({ message: '상품을 삭제하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 상품 삭제(item의 amount가 0이 아닐 경우)
  deleteItemCheckAnswer = async (req, res) => {
    try {
      const { id } = req.params;
      const { answer } = req.body;

      const deleteItemData = await this.itemService.deleteItemByIdWithAnswer(
        id,
        answer
      );

      if (deleteItemData === false) {
        return res.status(200).json({ message: '상품 삭제를 취소하였습니다.' });
      }
      return res.status(200).json({ message: '상품을 삭제하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };

  // 상품 수정
  modifyItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { optionId, name, price } = req.body;

      await this.itemService.modifyItem(id, optionId, name, price);
      return res.status(200).json({ message: '상품을 수정했습니다.' });
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
