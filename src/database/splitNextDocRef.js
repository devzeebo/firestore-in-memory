import split from 'lodash/fp/split';
import join from 'lodash/fp/join';

const splitNextDocRef = (ref) => {
  const [refName, ...remainingRef] = split('/')(ref);

  return {
    refName,
    remainingRef: join('/')(remainingRef),
  };
};

export default splitNextDocRef;
