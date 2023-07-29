const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../untils/makeErrorUtil.js');
const Enum = require('../config/enum.js');

class ItemService {
  itemRepository = new ItemRepository();

  // 상품 추가 유효성 검증
  validationMakeItem = async (name, price, type) => {
    if (!name) {
      throw new MakeError(400, '상품 이름을 입력해주세요.', 'invalid request');
    }

    if (!price) {
      throw new MakeError(400, '상품 가격을 입력해주세요.', 'invalid request');
    }

    const values = Object.values(Enum.itemType);

    if (!type || !values.includes(type)) {
      throw new MakeError(
        400,
        '알맞은 상품 타입을 선택해주세요.',
        'invalid request'
      );
    }

    const findItemName = await this.itemRepository.findOneItemByCondition({
      name,
    });

    if (findItemName) {
      throw new MakeError(
        400,
        '이미 존재하는 상품 이름입니다.',
        'invalid request'
      );
    }

    return null;
  };

  // 상품 추가 API
  makeItem = async (name, price, type) => {
    const validationError = await this.validationMakeItem(name, price, type);

    if (validationError) {
      return validationError;
    }

    await this.itemRepository.makeItem({ name, price, type });

    return true;
  };

  // 상품 리스트 조회(전체)
  findAllItemsWithPageNation = async (pageSize, pageNum) => {
    if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
      (pageSize = 10), (pageNum = 1);
    }

    const itemList = await this.itemRepository.findAllItemsWithPageNation(
      pageSize,
      pageNum
    );

    return itemList;
  };

  // 상품 타입별 조회 유효성 검증
  validationFindAllItemsByType = async (type) => {
    const values = Object.values(Enum.itemType);

    if (!type || !values.includes(type)) {
      throw new MakeError(
        400,
        '알맞은 상품 타입을 선택해주세요.',
        'invalid request'
      );
    }

    return null;
  };

  // 상품 리스트 조회(타입별)
  findAllItemsByTypeWithPageNation = async (pageSize, pageNum, type) => {
    if (isNaN(pageSize) || isNaN(pageNum) || pageSize < 1 || pageNum < 1) {
      (pageSize = 10), (pageNum = 1);
    }

    const validationError = await this.validationFindAllItemsByType(type);

    if (validationError) {
      return validationError;
    }

    const itemList = await this.itemRepository.findAllItemsByTypeWithPageNation(
      pageSize,
      pageNum,
      type
    );

    return itemList;
  };

  // 상품 삭제 유효성 검증
  validationDeleteItem = async (id) => {
    const findOneItem = await this.itemRepository.findOneItemByCondition({
      id,
    });

    if (!id || !findOneItem) {
      throw new MakeError(400, '잘못된 id 값입니다.', 'invalid request');
    }

    return null;
  };

  // 상품 삭제
  deleteItemById = async (id) => {
    const validationError = await this.validationDeleteItem(id);

    if (validationError) {
      return validationError;
    }

    await this.itemRepository.deleteItemById({ id });

    return true;
  };
}

module.exports = ItemService;
