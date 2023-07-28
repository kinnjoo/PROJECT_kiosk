const { Items } = require('../models');

class ItemRepository {
  // DB에서 item name 찾기
  findOneItemName = async (name) => await Items.findOne({ where: name });

  // 상품 추가
  createItem = async (createItemData) => await Items.create(createItemData);
}

module.exports = ItemRepository;
