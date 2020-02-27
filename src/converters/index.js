import identity from 'lodash/fp/identity';
import constant from 'lodash/fp/constant';

import assign from 'lodash/assign';

import createConverterOfType from './createConverterOfType';

export const CollectionRefProperties = {};
export const DocumentRefProperties = {};
export const QuerySnapProperties = {};
export const DocumentSnapProperties = {};

assign(CollectionRefProperties, {
  id: identity,
  // parent: toDocumentRef // defined below due to reference loop
  doc: identity,
  get: identity,
  path: identity,
  where: identity,
  __exists: identity,
  __converterType: constant('collection ref'),
});
export const convertToCollectionRef = createConverterOfType(CollectionRefProperties);

assign(DocumentRefProperties, {
  id: identity,
  // parent: toCollectionRef // defined below due to reference loop
  get: identity,
  collection: identity,
  path: identity,
  set: identity,
  update: identity,
  __exists: identity,
  __converterType: constant('document ref'),
});
export const convertToDocumentRef = createConverterOfType(DocumentRefProperties);

assign(QuerySnapProperties, {
  docs: identity,
  empty: identity,
  size: identity,
  __exists: identity,
  __converterType: constant('query snap'),
});
export const convertToQuerySnap = createConverterOfType(QuerySnapProperties);

assign(DocumentSnapProperties, {
  id: identity,
  ref: identity,
  data: identity,
  exists: identity,
  __exists: identity,
  __converterType: constant('document snap'),
});
export const convertToDocumentSnap = createConverterOfType(DocumentSnapProperties);

DocumentRefProperties.parent = convertToCollectionRef;
CollectionRefProperties.parent = convertToDocumentRef;
