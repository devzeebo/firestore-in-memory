import { map, cloneDeep } from 'lodash/fp';

const cloneForSnapshot = (fsDocument, createMockFirestoreDocument) => {
  const snapClone = createMockFirestoreDocument(
    fsDocument.id,
    fsDocument.parent,
    { isCollection: fsDocument.isCollection, exists: fsDocument.exists },
  );
  snapClone.children = map((child) => cloneForSnapshot(child, createMockFirestoreDocument))(fsDocument.children);
  snapClone.documentData = fsDocument.documentData;
  snapClone.snapData = cloneDeep(fsDocument.documentData);

  return snapClone;
};
export default cloneForSnapshot;
