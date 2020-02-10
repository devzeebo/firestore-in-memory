const get = (mockDocument) => () => mockDocument.snapData;

export default (mockDocument) => ({
  get: get(mockDocument),
});
