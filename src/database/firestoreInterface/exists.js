const get = (mockDocument) => () => Boolean(mockDocument.__exists);

export default (mockDocument) => ({
  get: get(mockDocument),
});
