const { Options, Items } = require('../models');

class OptionRepository {
  // 옵션 추가
  makeOption = async (makeOptionData) => await Options.create(makeOptionData);

  // 옵션 테이블 전체 조회
  findAllOptions = async () => await Options.findAll();

  // 옵션 삭제
  deleteOption = async (id) => await Options.destroy({ where: id });
}

module.exports = OptionRepository;
