import curry from 'lodash/fp/curry';
import flow from 'lodash/fp/flow';
import get from 'lodash/fp/get';

const childAccessor = (name) => flow(
  get('children'),
  get(name),
);
const getOrCreateChild = (fsDocument, createMockFirestoreDocument, { exists }, name) => (
  (fsDocument.__exists && childAccessor(name)(fsDocument))
    ? childAccessor(name)(fsDocument)
    : createMockFirestoreDocument(
      name,
      fsDocument,
      { isCollection: !fsDocument.isCollection, exists },
    )
);
export const getChild = (fsDocument, createMockFirestoreDocument) => (name) => (
  getOrCreateChild(fsDocument, createMockFirestoreDocument, { exists: false }, name)
);
export default curry(getOrCreateChild);
