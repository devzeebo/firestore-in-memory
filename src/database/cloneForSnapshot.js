import { mapValues, flow, cloneDeep } from 'lodash/fp';

const cloneForSnapshot = (fsDocument, createMockFirestoreDocument) => {
  const snapClone = createMockFirestoreDocument(
    fsDocument.id,
    fsDocument.parent,
    { isCollection: fsDocument.isCollection, exists: fsDocument.exists },
  );

  snapClone.children = mapValues((child) => cloneForSnapshot(child, createMockFirestoreDocument))(fsDocument.children);
  if (fsDocument.filters) {
    snapClone.children = flow(
      ...fsDocument.filters,
    )(snapClone.children);
  }

  snapClone.documentData = fsDocument.documentData;
  snapClone.snapData = cloneDeep(fsDocument.documentData);

  return snapClone;
};
export default cloneForSnapshot;
