import {
  flow, join, replace, getOr,
} from 'lodash/fp';

import assign from 'lodash/assign';
import augmentWithFirestoreInterface from './firestoreInterface';
import getDocument from './getDocument';
import setDocument from './setDocument';

const createMockFirestoreDocument = (id, parent, { isCollection, exists }) => {
  const mockDocument = ({
    id,
    parent,
    path: parent
      ? flow(
        join('/'),
        replace(/^\//, ''),
      )([parent.path, id])
      : '',
    isCollection,
    __exists: exists,
    children: {},
  });

  assign(mockDocument, {
    database: getOr(parent, 'database')(parent),
    getDocument: getDocument(mockDocument, createMockFirestoreDocument),
    setDocument: setDocument(mockDocument, createMockFirestoreDocument),
  });

  augmentWithFirestoreInterface(mockDocument, createMockFirestoreDocument);

  return mockDocument;
};
export default createMockFirestoreDocument;
