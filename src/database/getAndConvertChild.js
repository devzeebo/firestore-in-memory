import flow from 'lodash/fp/flow';
import { getChild } from './getChild';

export default (converter, fsDocument, createMockFirestoreDocument) => flow(
  getChild(fsDocument, createMockFirestoreDocument),
  converter,
);
