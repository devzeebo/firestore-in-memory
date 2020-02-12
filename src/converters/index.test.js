/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import keys from 'lodash/fp/keys';

import {
  CollectionRefProperties,
  DocumentRefProperties,
  convertToCollectionRef,
  convertToDocumentRef,
  QuerySnapProperties,
  DocumentSnapProperties,
} from './index';

describe('converters', () => {
  test('collection ref', {
    given: {
      collection_ref_props,
    },
    then: {
      required: prop_names([
        'id',
        'parent',
        'doc',
        'get',
        'where',
        '__converterType',
        '__exists',
      ]),
      parent_is_DOCUMENT_ref,
    },
  });

  test('document ref', {
    given: {
      document_ref_props,
    },
    then: {
      required: prop_names([
        'id',
        'parent',
        'get',
        'collection',
        'set',
        'update',
        '__converterType',
        '__exists',
      ]),
      parent_is_COLLECTION_ref,
    },
  });

  test('document snap', {
    given: {
      document_snap_props,
    },
    then: {
      required: prop_names([
        'id',
        'ref',
        'data',
        'exists',
        '__converterType',
        '__exists',
      ]),
    },
  });

  test('query snap', {
    given: {
      query_snap_props,
    },
    then: {
      required: prop_names([
        'docs',
        'empty',
        'size',
        '__converterType',
        '__exists',
      ]),
    },
  });
});

function collection_ref_props() {
  this.props = CollectionRefProperties;
}
function document_ref_props() {
  this.props = DocumentRefProperties;
}
function document_snap_props() {
  this.props = DocumentSnapProperties;
}
function query_snap_props() {
  this.props = QuerySnapProperties;
}

function parent_is_DOCUMENT_ref() {
  expect(this.props.parent).toBe(convertToDocumentRef);
}
function parent_is_COLLECTION_ref() {
  expect(this.props.parent).toBe(convertToCollectionRef);
}
function prop_names(names) {
  return function () {
    expect(keys(this.props)).toEqual(expect.arrayContaining(names));
  };
}
