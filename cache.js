const nodeCache = require('node-cache');
const OptionRepository = require('./repositories/optionRepository.js');

const cache = new nodeCache({ stdTTL: 3600, checkperiod: 600 }); // default stdTTL: 0, checkperiod: 600

class OptionsCaching {
  optionRepository = new OptionRepository();

  setCachedOptions = async () => {
    try {
      const options = await this.optionRepository.getAllOptions();
      for (const option of options) {
        cache.set(`cacheKey${option.id}`, option);
      }
      console.log('옵션 데이터 캐싱 성공');
    } catch (err) {
      console.log('옵션 데이터 캐싱 실패', err);
      throw err;
    }
  };

  getCachedOption = (optionId) => {
    try {
      const cachedOption = cache.get(`cacheKey${optionId}`);
      console.log('옵션 데이터 GET 성공');
      return cachedOption;
    } catch (err) {
      console.log('옵션 데이터 GET 실패', err);
      throw err;
    }
  };
}

module.exports = OptionsCaching;
