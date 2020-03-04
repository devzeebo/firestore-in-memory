import { invokeArgs } from 'lodash/fp';

import operators from './operators';

export default (path, op, value) => {
  const filter = invokeArgs(op, value)(operators);

  if (!filter) {
    throw new Error(`Operator [${op}] not implemented`);
  }

  filter('cat');
};
