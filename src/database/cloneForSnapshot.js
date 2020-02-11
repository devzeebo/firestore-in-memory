import cloneDeep from 'lodash/fp/cloneDeep';

const cloneForSnapshot = (fsDocument, createMockFirestoreDocument) => {
  const snapClone = createMockFirestoreDocument(
    fsDocument.id,
    fsDocument.parent,
    { isCollection: fsDocument.isCollection, exists: fsDocument.exists },
  );
  snapClone.documentData = fsDocument.documentData;
  snapClone.snapData = cloneDeep(fsDocument.documentData);

  return snapClone;
};
export default cloneForSnapshot;
