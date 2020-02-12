/* eslint-disable no-underscore-dangle */
import forEach from 'lodash/fp/forEach';
import isNil from 'lodash/fp/isNil';
import join from 'lodash/fp/join';
import get from 'lodash/fp/get';
import objectHash from 'object-hash';

const forEachWithKey = forEach.convert({ cap: false });

const cacheContext = {
  levels: 0,
  cache: null,
};

export const getCacheKey = (srcCacheKey, value) => (
  join(':', [
    srcCacheKey,
    get('path')(value) || objectHash(value || null, { ignoreUnknown: true }),
  ])
);

const createConverterOfType = (props) => {
  const converter = (src) => {
    if (isNil(src)) {
      return src;
    }

    const cache = (cacheContext.cache || (cacheContext.cache = new Map()));

    const srcCacheKey = getCacheKey(props.__converterType(), src);

    if (cache.has(srcCacheKey)) {
      return cache.get(srcCacheKey);
    }

    cacheContext.levels += 1;

    const dst = {};
    cache.set(srcCacheKey, dst);

    forEachWithKey((convertFunc, key) => {
      dst[key] = convertFunc(src[key]);
    })(props);

    cacheContext.levels -= 1;

    if (cacheContext.levels === 0) {
      cacheContext.cache = null;
    }

    return dst;
  };
  converter.type = () => props.__converterType();
  converter.isTypeConverter = true;

  return converter;
};

export default createConverterOfType;
