const { Options } = require('../models');

class OptionRepository {
  // 옵션 추가
  makeOption = async (makeOptionData) => await Options.create(makeOptionData);

  // 옵션 테이블 전체 조회
  findAllOptions = async () => await Options.findAll();
}

module.exports = OptionRepository;
