const get = (mockDocument) => () => mockDocument.__exists;

export default (mockDocument) => ({
  get: get(mockDocument),
});
