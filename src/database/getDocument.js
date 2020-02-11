import curry from 'lodash/fp/curry';
import splitNextDocRef from './splitNextDocRef';
import getOrCreateChild from './getChild';
import cloneForSnapshot from './cloneForSnapshot';

const getDocument = (fsDocument, createMockFirestoreDocument, ref, mockData = undefined) => {
  const { refName, remainingRef } = splitNextDocRef(ref);

  const child = getOrCreateChild(fsDocument, createMockFirestoreDocument, { exists: Boolean(mockData) }, refName);

  if (remainingRef) {
    return getDocument(child, createMockFirestoreDocument, remainingRef, mockData);
  }

  if (mockData) {
    const duplicatedDocument = cloneForSnapshot(child, createMockFirestoreDocument);
    duplicatedDocument.documentData = mockData;

    return duplicatedDocument;
  }

  return child;
};
export default curry(getDocument);
