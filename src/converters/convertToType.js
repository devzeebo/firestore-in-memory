/* eslint-disable no-underscore-dangle */
import forEach from 'lodash/fp/forEach';
import isNil from 'lodash/fp/isNil';
import join from 'lodash/fp/join';
import objectHash from 'object-hash';

const forEachWithKey = forEach.convert({ cap: false });

const cacheContext = {
  levels: 0,
  cache: null,
};

const getCacheKey = (srcCacheKey, ref, value) => (
  join(':', [
    srcCacheKey,
    ref,
    (value && value.path) || objectHash(value || null, { ignoreUnknown: true }),
  ])
);

const convertToType = (props) => (src) => {
  if (isNil(src)) {
    return src;
  }

  const cache = (cacheContext.cache || (cacheContext.cache = new Map()));

  const srcCacheKey = getCacheKey(props.__converterType(), '', src);

  if (cache.has(srcCacheKey)) {
    return cache.get(srcCacheKey);
  }

  cacheContext.levels += 1;

  const dst = {};
  cache.set(srcCacheKey, dst);

  forEachWithKey((converter, key) => {
    const cacheKey = getCacheKey(srcCacheKey, key, src[key]);

    if (!cache.has(cacheKey)) {
      if (converter.isTypeConverter) {
        cache.set(cacheKey, converter(src[key], cache));
      } else {
        cache.set(cacheKey, converter(src[key]));
      }
    }

    dst[key] = cache.get(cacheKey);
  })(props);

  cacheContext.levels -= 1;

  if (cacheContext.levels === 0) {
    cacheContext.cache = null;
  }

  return dst;
};

export default convertToType;
