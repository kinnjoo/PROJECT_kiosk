const nodeCache = require('node-cache');

const OptionRepository = require('./repositories/optionRepository.js');

class OptionsCaching {
  cache = new nodeCache({ stdTTL: 3600, checkperiod: 600 }); // default stdTTL: 0, checkperiod: 600
  optionRepository = new OptionRepository();

  setCachedData = async () => {
    try {
      const options = await this.optionRepository.findAllOptions();
      this.cache.set('options', options);
      console.log('옵션 데이터 캐싱 성공');
    } catch (err) {
      console.log('옵션 데이터 캐싱 실패', err);
      throw err;
    }
  };
}

module.exports = OptionsCaching;
