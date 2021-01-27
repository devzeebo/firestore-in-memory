import {
  forEach,
  isObject,
  isArray,
} from 'lodash/fp';

const firestoreMerge = (obj, merge) => {
  const newObj = {
    ...obj,
    ...merge,
  };

  forEach.convert({ cap: false })(
    (value, key) => {
      if (isObject(value) && !isArray(value)) {
        newObj[key] = firestoreMerge(
          (obj || {})[key] || {},
          newObj[key],
        );
      }
    },
    newObj,
  );

  return newObj;
};

export default firestoreMerge;
