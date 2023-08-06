const { Options, Items } = require('../models');

class ItemRepository {
  // DB에서 item 찾기
  findOneItemByCondition = async (condition) =>
    await Items.findOne({ where: condition });

  // 상품 추가
  makeItem = async (makeItemData) => await Items.create(makeItemData);

  // 상품 리스트 조회(전체)
  findAllItemsWithPagination = async (pagination) => {
    const pageSize = pagination.pageSize;
    const pageNum = pagination.pageNum;

    const itemList = await Items.findAll({
      attributes: ['id', 'optionId', 'name', 'price', 'type', 'amount'],
      include: {
        model: Options,
        attributes: ['extraPrice', 'shotPrice', 'hot'],
      },
      limit: pageSize,
      offset: (pageNum - 1) * pageSize,
      order: [['createdAt', 'DESC']],
    });

    return itemList;
  };

  // 상품 리스트 조회(타입별)
  findAllItemsByTypeWithPagination = async (pagination, type) => {
    const pageSize = pagination.pageSize;
    const pageNum = pagination.pageNum;

    const itemList = await Items.findAll({
      where: { type },
      attributes: ['id', 'optionId', 'name', 'price', 'amount'],
      include: {
        model: Options,
        attributes: ['extraPrice', 'shotPrice', 'hot'],
      },
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
