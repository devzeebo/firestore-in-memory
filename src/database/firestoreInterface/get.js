import {
  convertToDocumentSnap,
  convertToQuerySnap,
} from '../../converters';
import cloneForSnapshot from '../cloneForSnapshot';

const get = (fsDocument, createMockFirestoreDocument) => async () => {
  const snapClone = cloneForSnapshot(fsDocument, createMockFirestoreDocument);

  const snap = fsDocument.isCollection
    ? convertToQuerySnap(snapClone)
    : convertToDocumentSnap(snapClone);

  return Promise.resolve(snap);
};
export default get;
