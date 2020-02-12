/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import {
  CollectionRefProperties,
  DocumentRefProperties,
  convertToCollectionRef,
  convertToDocumentRef,
} from './index';

describe('converters', () => {
  test('collection ref parent is document ref', {
    given: {
      collection_ref_props,
    },
    then: {
      parent_is_DOCUMENT_ref,
    },
  });

  test('document ref parent is collection ref', {
    given: {
      document_ref_props,
    },
    then: {
      parent_is_COLLECTION_ref,
    },
  });
});

function collection_ref_props() {
  this.props = CollectionRefProperties;
}
function document_ref_props() {
  this.props = DocumentRefProperties;
}

function parent_is_DOCUMENT_ref() {
  expect(this.props.parent).toBe(convertToDocumentRef);
}
function parent_is_COLLECTION_ref() {
  expect(this.props.parent).toBe(convertToCollectionRef);
}
