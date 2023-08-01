const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');
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
    await this.validationMakeItem(name, price, type);
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

    await this.validationFindAllItemsByType(type);

    const itemList = await this.itemRepository.findAllItemsByTypeWithPageNation(
      pageSize,
      pageNum,
      type
    );

    return itemList;
  };

  // 상품 삭제 유효성 검증
  validationDeleteItemById = async (id) => {
    const findOneItem = await this.itemRepository.findOneItemByCondition({
      id,
    });

    if (!findOneItem) {
      throw new MakeError(400, '잘못된 id 값입니다.', 'invalid request');
    }

    if (findOneItem.amount > 0) {
      throw new MakeError(
        400,
        '현재 수량이 남아있습니다. 삭제하시겠습니까?',
        'invalid request'
      );
    }

    return null;
  };

  // 상품 삭제
  deleteItemById = async (id) => {
    await this.validationDeleteItemById(id);
    await this.itemRepository.deleteItemById({ id });
    return true;
  };

  // 상품 삭제 답변 유효성 검증
  validationDeleteItemByAnswer = async (id, answer) => {
    if (!answer) {
      throw new MakeError(400, '삭제 여부를 선택해주세요.', 'invalid request');
    }

    if (answer !== '예' && answer !== '아니오') {
      throw new MakeError(400, '잘못된 입력값입니다.', 'invalid request');
    }

    const findOneItem = await this.itemRepository.findOneItemByCondition({
      id,
    });
    if (!findOneItem) {
      throw new MakeError(400, '잘못된 id 값입니다.', 'invalid request');
    }

    return null;
  };

  // 상품 삭제(item의 amount가 0이 아닐 경우)
  deleteItemByIdWithAnswer = async (id, answer) => {
    await this.validationDeleteItemByAnswer(id, answer);

    if (answer === '아니오') {
      return false;
    }

    await this.itemRepository.deleteItemById({ id });
    return true;
  };

  // 상품 수정 유효성 검증
  validationModifyItem = async (id, name, price) => {
    if (!name) {
      throw new MakeError(400, '이름을 입력해주세요', 'invalid request');
    }

    if (price <= 0) {
      throw new MakeError(400, '알맞은 가격을 입력해주세요', 'invalid request');
    }

    const findOneItem = await this.itemRepository.findOneItemByCondition({
      id,
    });
    if (!findOneItem) {
      throw new MakeError(400, '잘못된 id 값입니다.', 'invalid request');
    }

    return null;
  };

  // 상품 수정
  modifyItem = async (id, name, price) => {
    await this.validationModifyItem(id, name, price);
    await this.itemRepository.modifyItemById({ name, price }, { id });
    return true;
  };
}

module.exports = ItemService;
