import size from 'lodash/fp/size';

const get = (mockDocument) => () => size(mockDocument.children) === 0;

export default (mockDocument) => ({
  get: get(mockDocument),
});
