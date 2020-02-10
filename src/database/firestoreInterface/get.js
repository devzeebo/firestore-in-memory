import cloneDeep from 'lodash/fp/cloneDeep';
import {
  convertToDocumentSnap,
  convertToQuerySnap,
} from '../../converters';

const get = (fsDocument, createMockFirestoreDocument) => async () => {
  const snapClone = createMockFirestoreDocument(
    fsDocument.id,
    fsDocument.parent,
    { isCollection: fsDocument.isCollection, exists: fsDocument.exists },
  );
  snapClone.documentData = fsDocument.documentData;
  snapClone.snapData = cloneDeep(fsDocument.documentData);

  const snap = fsDocument.isCollection
    ? convertToQuerySnap(snapClone)
    : convertToDocumentSnap(snapClone);

  return Promise.resolve(snap);
};
export default get;
