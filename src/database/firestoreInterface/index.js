import mapValues from 'lodash/fp/mapValues';
import invokeArgs from 'lodash/fp/invokeArgs';
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

import get from './get';
import set from './set';
import update from './update';

const augmentProps = (mockDocument) => {
  Object.defineProperties(mockDocument, mapValues(invokeArgs([mockDocument]))(
    [exists, size, empty, docs, ref],
  ));
};

const augmentMethods = (mockDocument, createMockFirestoreDocument) => assign(mockDocument, {
  doc: getAndConvertChild(convertToDocumentRef, mockDocument, createMockFirestoreDocument),
  collection: getAndConvertChild(convertToCollectionRef, mockDocument, createMockFirestoreDocument),
  get: get(mockDocument, createMockFirestoreDocument),
  set: set(mockDocument),
  update: update(mockDocument),
});

export default (mockDocument, createMockFirestoreDocument) => {
  augmentMethods(mockDocument, createMockFirestoreDocument);
  augmentProps(mockDocument);
};
