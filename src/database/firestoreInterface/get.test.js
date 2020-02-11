/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import cloneDeep from 'lodash/fp/cloneDeep';
import get from './get';

import {
  convertToDocumentSnap as mock_convertToDocumentSnap,
  convertToQuerySnap as mock_convertToQuerySnap,
} from '../../converters';
import mock_cloneForSnapshot from '../cloneForSnapshot';

jest.mock('../../converters');
jest.mock('../cloneForSnapshot');

describe('firestore interface::get', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('collection returns query snapshot', {
    given: {
      mock_COLLECTION_document,
      mock_clone_result,
      mock_converters,
    },
    when: {
      getting_ref,
    },
    then: {
      result_is_QUERY_snapshot,
    },
  });

  test('document returns document snapshot', {
    given: {
      mock_DOCUMENT_document,
      mock_clone_result,
      mock_converters,
    },
    when: {
      getting_ref,
    },
    then: {
      result_is_DOCUMENT_snapshot,
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
function mock_clone_result() {
  mock_cloneForSnapshot.mockImplementationOnce(() => cloneDeep(this.document));
}
function mock_converters() {
  this.doc_snap = {};
  this.query_snap = {};

  mock_convertToDocumentSnap
    .mockImplementationOnce(() => this.doc_snap);
  mock_convertToQuerySnap
    .mockImplementationOnce(() => this.query_snap);
}

async function getting_ref() {
  this.result = await get(this.document, undefined)();
}

function result_is_QUERY_snapshot() {
  expect(this.result).toBe(this.query_snap);
}
function result_is_DOCUMENT_snapshot() {
  expect(this.result).toBe(this.doc_snap);
}
