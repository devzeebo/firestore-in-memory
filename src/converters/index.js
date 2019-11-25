import identity from 'lodash/fp/identity';
import constant from 'lodash/fp/constant';
import assign from 'lodash/fp/assign';

import convertToType from './convertToType';

const CollectionRefProperties = {};
const DocumentRefProperties = {};
const QuerySnapProperties = {};
const DocumentSnapProperties = {};

assign(CollectionRefProperties, {
  id: identity,
  // parent: toDocumentRef // defined below due to reference loop
  doc: identity,
  get: identity,
  where: identity,
  __exists: identity,
  __converterType: constant('collection ref'),
});
export const convertToCollectionRef = convertToType(CollectionRefProperties);
convertToCollectionRef.isTypeConverter = true;

assign(DocumentRefProperties, {
  id: identity,
  // parent: toCollectionRef // defined below due to reference loop
  get: identity,
  collection: identity,
  set: identity,
  update: identity,
  __exists: identity,
  __converterType: constant('document ref'),
});
export const convertToDocumentRef = convertToType(DocumentRefProperties);
convertToDocumentRef.isTypeConverter = true;

assign(QuerySnapProperties, {
  docs: identity,
  empty: identity,
  size: identity,
  __exists: identity,
  __converterType: constant('query snap'),
});
export const convertToQuerySnap = convertToType(QuerySnapProperties);
convertToQuerySnap.isTypeConverter = true;

assign(DocumentSnapProperties, {
  id: identity,
  ref: identity,
  data: identity,
  exists: identity,
  __exists: identity,
  __converterType: constant('document snap'),
});
export const convertToDocumentSnap = convertToType(DocumentSnapProperties);
convertToDocumentSnap.isTypeConverter = true;

DocumentRefProperties.parent = convertToCollectionRef;
CollectionRefProperties.parent = convertToDocumentRef;
