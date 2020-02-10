import flow from 'lodash/fp/flow';
import join from 'lodash/fp/join';
import replace from 'lodash/fp/replace';

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
    getDocument: getDocument(mockDocument, createMockFirestoreDocument),
    setDocument: setDocument(mockDocument, createMockFirestoreDocument),
  });

  augmentWithFirestoreInterface(mockDocument, createMockFirestoreDocument);

  return mockDocument;
};
export default createMockFirestoreDocument;
