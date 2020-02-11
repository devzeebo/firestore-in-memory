import flow from 'lodash/fp/flow';
import split from 'lodash/fp/split';
import replace from 'lodash/fp/replace';
import join from 'lodash/fp/join';

const splitNextDocRef = (ref) => {
  const [refName, ...remainingRef] = flow(
    replace(/^\/+/, ''),
    split('/'),
  )(ref);

  return {
    refName,
    remainingRef: join('/')(remainingRef),
  };
};

export default splitNextDocRef;
