import flow from 'lodash/fp/flow';
import values from 'lodash/fp/values';
import map from 'lodash/fp/map';
import { convertToDocumentSnap } from '../../converters';

const get = (mockDocument) => () => flow(
  values,
  map(convertToDocumentSnap),
)(mockDocument.children);

export default (mockDocument) => ({
  get: get(mockDocument),
});
