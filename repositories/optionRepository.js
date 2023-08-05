const { Options } = require('../models');

class OptionRepository {
  // 옵션 추가
  makeOption = async (makeOptionData) => await Options.create(makeOptionData);

  // 옵션 테이블 전체 조회
  getAllOptions = async () => await Options.findAll();

  // 옵션 데이터 찾기
  findOneOption = async (id) => await Options.findOne({ where: id });

  // 옵션 삭제
  deleteOption = async (id) => await Options.destroy({ where: id });
}

module.exports = OptionRepository;
