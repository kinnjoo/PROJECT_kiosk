const { Options } = require('../models');

class OptionRepository {
  // 옵션 추가
  makeOption = async (makeOptionData) => await Options.create(makeOptionData);
}

module.exports = OptionRepository;
