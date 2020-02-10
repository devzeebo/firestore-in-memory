import curry from 'lodash/fp/curry';
import splitNextDocRef from './splitNextDocRef';
import getOrCreateChild from './getChild';

const getDocument = (fsDocument, createMockFirestoreDocument, ref, mock = { data: undefined }) => {
  const { refName, remainingRef } = splitNextDocRef(ref);

  const child = getOrCreateChild(fsDocument, createMockFirestoreDocument, { exists: Boolean(mock.data) }, refName);

  if (remainingRef) {
    return getDocument(child, createMockFirestoreDocument, remainingRef, mock.data);
  }

  if (mock.data) {
    const duplicatedDocument = child.clone();
    duplicatedDocument.documentData = mock.data;

    return duplicatedDocument;
  }

  return child;
};
export default curry(getDocument);
