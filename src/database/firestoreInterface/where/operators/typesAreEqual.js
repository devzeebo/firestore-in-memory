import { isEqual } from 'lodash/fp';

export default (value, dataValue) => isEqual(typeof value, typeof dataValue);
