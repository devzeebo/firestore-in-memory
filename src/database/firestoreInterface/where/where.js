import {
  flow,
  partial,
  pickBy,
  get,
} from 'lodash/fp';

import operators from './operators';
import cloneForQuery from '../../cloneForQuery';

export default (mockDocument, createMockFirestoreDocument) => (path, op, value) => {
  if (!operators[op]) {
    throw new Error(`Operator [${op}] not implemented`);
  }

  const whereFilter = partial(operators[op])([value]);

  return cloneForQuery(mockDocument, createMockFirestoreDocument, pickBy(
    flow(
      get('documentData'),
      get(path),
      whereFilter,
    ),
  ));
};
