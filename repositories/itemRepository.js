const { Items } = require('../models');

class ItemRepository {
  // DB에서 item 찾기
  findOneItemByCondition = async (condition) =>
    await Items.findOne({ where: condition });

  // 상품 추가
  makeItem = async (makeItemData) => await Items.create(makeItemData);

  // 상품 리스트 조회(전체)
  findAllItemsWithPageNation = async (pageSize, pageNum) => {
    const itemList = await Items.findAll({
      attributes: ['id', 'optionId', 'name', 'price', 'type', 'amount'],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [['createdAt', 'DESC']],
    });

    return itemList;
  };

  // 상품 리스트 조회(타입별)
  findAllItemsByTypeWithPageNation = async (pageSize, pageNum, type) => {
    const itemList = await Items.findAll({
      where: { type },
      attributes: ['id', 'optionId', 'name', 'price', 'amount'],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [['createdAt', 'DESC']],
    });

    return itemList;
  };

  // 상품 삭제
  deleteItemById = async (id) => await Items.destroy({ where: id });

  // 상품 수정
  modifyItemById = async (modifyData, id) =>
    await Items.update(modifyData, { where: id });
}

module.exports = ItemRepository;
