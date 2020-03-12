import mapValues from 'lodash/fp/mapValues';
import assign from 'lodash/assign';

import getAndConvertChild from '../getAndConvertChild';
import {
  convertToDocumentRef,
  convertToCollectionRef,
} from '../../converters';

// Props
import exists from './exists';
import size from './size';
import empty from './empty';
import docs from './docs';
import ref from './ref';

import data from './data';
import get from './get';
import set from './set';
import update from './update';
import where from './where/where';

const augmentProps = (mockDocument) => {
  const bindToMockDocument = (it) => it(mockDocument);

  Object.defineProperties(
    mockDocument,
    mapValues(bindToMockDocument)({
      exists, size, empty, docs, ref,
    }),
  );
};

const augmentMethods = (mockDocument, createMockFirestoreDocument) => assign(mockDocument, {
  collection: getAndConvertChild(convertToCollectionRef, mockDocument, createMockFirestoreDocument),
  data: data(mockDocument),
  doc: getAndConvertChild(convertToDocumentRef, mockDocument, createMockFirestoreDocument),
  get: get(mockDocument, createMockFirestoreDocument),
  set: set(mockDocument),
  update: update(mockDocument),
  where: where(mockDocument, createMockFirestoreDocument),
});

export default (mockDocument, createMockFirestoreDocument) => {
  augmentMethods(mockDocument, createMockFirestoreDocument);
  augmentProps(mockDocument);
};
