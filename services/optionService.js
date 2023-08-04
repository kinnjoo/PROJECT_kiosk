const OptionRepository = require('../repositories/optionRepository.js');
const OptionsCaching = require('../cache.js');
const MakeError = require('../utils/makeErrorUtil.js');

class OptionService {
  optionRepository = new OptionRepository();
  optionsCaching = new OptionsCaching();

  // 옵션 추가 유효성 검증
  validationMakeOption = async (extraPrice, shotPrice, hot) => {
    if (!extraPrice || !shotPrice || !hot) {
      throw new MakeError(400, '모든 항목을 입력해주셔야 합니다.');
    }

    if (
      isNaN(extraPrice) ||
      isNaN(shotPrice) ||
      isNaN(hot) ||
      hot < 0 ||
      hot > 1
    ) {
      throw new MakeError(400, '잘못된 형식입니다.');
    }

    return;
  };

  // 옵션 추가
  makeOption = async (extraPrice, shotPrice, hot) => {
    await this.validationMakeOption(extraPrice, shotPrice, hot);

    const makeOption = await this.optionRepository.makeOption({
      extraPrice,
      shotPrice,
      hot,
    });

    if (makeOption) {
      return await this.optionsCaching.setCachedOptions();
    }

    return true;
  };

  // 옵션 삭제 유효성 검증
  validationDeleteOption = async (id) => {
    const findOptionData = await this.optionRepository.findOneOption({ id });
    if (!findOptionData) {
      throw new MakeError(400, '존재하지 않는 옵션입니다.');
    }

    return;
  };

  // 옵션 삭제
  deleteOption = async (id) => {
    await this.validationDeleteOption(id);

    const deleteOption = await this.optionRepository.deleteOption({ id });
    if (deleteOption) {
      await this.optionsCaching.setCachedOptions();
    }

    return true;
  };
}

module.exports = OptionService;
