const cloneForQuery = (fsDocument, createMockFirestoreDocument, newFilter) => {
  const queryClone = createMockFirestoreDocument(
    fsDocument.id,
    fsDocument.parent,
    { isCollection: fsDocument.isCollection, exists: fsDocument.exists },
  );
  queryClone.children = fsDocument.children;
  queryClone.documentData = fsDocument.documentData;
  queryClone.filters = [
    ...fsDocument.filters || [],
    newFilter,
  ];

  return queryClone;
};
export default cloneForQuery;
