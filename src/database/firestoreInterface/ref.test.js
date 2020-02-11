/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import refProp from './ref';

import {
  convertToDocumentRef as mock_convertToDocumentRef,
  convertToCollectionRef as mock_convertToCollectionRef,
} from '../../converters';

jest.mock('../../converters');

describe('firestore interface::ref', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('collection returns collection ref', {
    given: {
      mock_COLLECTION_document,
      mock_converters,
    },
    when: {
      getting_ref,
    },
    then: {
      result_is_COLLECTION_ref,
    },
  });

  test('document returns document ref', {
    given: {
      mock_DOCUMENT_document,
      mock_converters,
    },
    when: {
      getting_ref,
    },
    then: {
      result_is_DOCUMENT_ref,
    },
  });
});

function mock_COLLECTION_document() {
  this.document = {
    isCollection: true,
  };
}
function mock_DOCUMENT_document() {
  this.document = {
    isCollection: false,
  };
}
function mock_converters() {
  this.doc_ref = {};
  this.query_ref = {};

  mock_convertToDocumentRef
    .mockImplementationOnce(() => this.doc_ref);
  mock_convertToCollectionRef
    .mockImplementationOnce(() => this.query_ref);
}

function getting_ref() {
  this.result = refProp(this.document).get();
}

function result_is_COLLECTION_ref() {
  expect(this.result).toBe(this.query_ref);
}
function result_is_DOCUMENT_ref() {
  expect(this.result).toBe(this.doc_ref);
}
