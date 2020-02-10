import size from 'lodash/fp/size';

const get = (mockDocument) => () => size(mockDocument.children);

export default (mockDocument) => ({
  get: get(mockDocument),
});
