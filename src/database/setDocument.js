/* eslint-disable no-param-reassign */
import curry from 'lodash/fp/curry';
import splitNextDocRef from './splitNextDocRef';
import getOrCreateChild from './getChild';

const setDocument = (fsDocument, createMockFirestoreDocument, ref, data) => {
  const { refName, remainingRef } = splitNextDocRef(ref);

  const child = getOrCreateChild(fsDocument, createMockFirestoreDocument, { exists: true }, refName);
  fsDocument.children[refName] = child;

  if (remainingRef) {
    setDocument(fsDocument, createMockFirestoreDocument, remainingRef, data);
  } else {
    child.documentData = data;
  }
};
export default curry(setDocument);
