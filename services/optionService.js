const OptionRepository = require('../repositories/optionRepository.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OptionService {
  optionRepository = new OptionRepository();

  // 옵션 추가 유효성 검증
  validationMakeOption = async (extraPrice, shotPrice, hot) => {
    if (!extraPrice || !shotPrice || !hot) {
      throw new MakeError(
        400,
        '모든 항목을 입력해주셔야 합니다.',
        'invalid request'
      );
    }

    if (
      isNaN(extraPrice) ||
      isNaN(shotPrice) ||
      isNaN(hot) ||
      hot < 0 ||
      hot > 1
    ) {
      throw new MakeError(400, '잘못된 형식입니다.', 'invalid request');
    }

    return null;
  };

  // 옵션 추가
  makeOption = async (extraPrice, shotPrice, hot) => {
    await this.validationMakeOption(extraPrice, shotPrice, hot);
    await this.optionRepository.makeOption({ extraPrice, shotPrice, hot });

    return true;
  };
}

module.exports = OptionService;
