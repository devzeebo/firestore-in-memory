const update = (mockDocument) => async (data) => {
  mockDocument.database.setDocument(mockDocument.path, {
    ...mockDocument.documentData,
    ...data,
  });

  return Promise.resolve();
};
export default update;
