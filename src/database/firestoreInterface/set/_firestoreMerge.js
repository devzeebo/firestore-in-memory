import {
  keys,
  isObject,
  isArray,
} from 'lodash/fp';

const firestoreMerge = (obj, merge) => {
  const newObj = {
    ...obj,
    ...merge,
  };

  for (let key in newObj) {
    if (isObject(newObj[key]) && !isArray(newObj[key])) {
      newObj[key] = firestoreMerge(
        (obj || {})[key] || {},
        newObj[key],
      );
    }
  }

  return newObj;
};

export default firestoreMerge;