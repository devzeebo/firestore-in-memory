import equal from './equal';
import greaterThan from './greaterThan';
import lessThan from './lessThan';
import greaterThanOrEqual from './greaterThanOrEqual';
import lessThanOrEqual from './lessThanOrEqual';

export default {
  '==': equal,
  '<': lessThan,
  '<=': lessThanOrEqual,
  '>': greaterThan,
  '>=': greaterThanOrEqual,
};
