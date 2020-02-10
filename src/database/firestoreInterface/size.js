const get = (mockDocument) => () => mockDocument.size === 0;

export default (mockDocument) => ({
  get: get(mockDocument),
});
