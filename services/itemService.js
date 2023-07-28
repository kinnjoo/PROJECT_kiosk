const ItemRepository = require('../repositories/itemRepository.js');
const MakeError = require('../untils/makeErrorUtil.js');
const Enum = require('../config/enum.js');

class ItemService {
  itemRepository = new ItemRepository();

  // 상품 추가 유효성 검증
  validationCreateItem = async (name, price, type) => {
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

    const findItemName = await this.itemRepository.findOneItemName({ name });

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
  createItem = async (name, price, type) => {
    const validationError = await this.validationCreateItem(name, price, type);

    if (validationError) {
      return validationError;
    }

    await this.itemRepository.createItem({ name, price, type });

    return true;
  };
}

module.exports = ItemService;
