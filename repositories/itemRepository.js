const { Items } = require('../models');

class ItemRepository {
  // DB에서 item name 찾기
  findOneItemName = async (name) => await Items.findOne({ where: name });

  // 상품 추가
  createItem = async (createItemData) => await Items.create(createItemData);

  // 상품 리스트 조회
  findAllItemsWithPageNation = async (pageSize, pageNum) => {
    const itemList = await Items.findAll({
      attributes: ['id', 'optionId', 'name', 'price', 'type', 'amount'],
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [['createdAt', 'DESC']],
    });
    return itemList;
  };
}

module.exports = ItemRepository;
