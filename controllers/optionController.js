const OptionService = require('../services/optionService');
const MakeError = require('../utils/makeErrorUtil.js');

class OptionController {
  optionService = new OptionService();

  // 옵션 추가
  makeOption = async (req, res) => {
    try {
      const { extraPrice, shotPrice, hot } = req.body;

      await this.optionService.makeOption(extraPrice, shotPrice, hot);
      return res.status(201).json({ message: '옵션을 추가하였습니다.' });
    } catch (err) {
      if (err instanceof MakeError) {
        return res.status(err.code).json({ message: err.message });
      }
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }
  };
}

module.exports = OptionController;
