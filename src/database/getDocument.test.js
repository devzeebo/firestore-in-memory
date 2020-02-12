/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import cloneDeep from 'lodash/fp/cloneDeep';

import getDocument from './getDocument';

import mockCloneForSnapshot from './cloneForSnapshot';
import mockGetOrCreateChild from './getChild';
import mockSplitNextDocRef from './splitNextDocRef';

jest.mock('./splitNextDocRef');
jest.mock('./getChild');
jest.mock('./cloneForSnapshot');

describe('get document', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('direct reference', {
    given: {
      DIRECT_ref,
      mock_child,
    },
    when: {
      getting_document_WITHOUT_mock_data,
    },
    then: {
      child_is_returned,
    },
  });

  test('nested reference', {
    given: {
      NESTED_ref,
      mock_child,
    },
    when: {
      getting_document_WITHOUT_mock_data,
    },
    then: {
      NESTED_child_is_returned,
    },
  });

  test('with mock data', {
    given: {
      DIRECT_ref,
      mock_child,
      mock_clone,
    },
    when: {
      getting_document_WITH_mock_data,
    },
    then: {
      result_is_NOT_direct_child,
      result_has_MOCK_DATA,
      result_DOES_NOT_have_ORIGINAL_DATA,
      direct_child_is_NOT_MODIFIED,
    },
  });
});

function DIRECT_ref() {
  this.ref = '123-abc';
  mockSplitNextDocRef
    .mockImplementationOnce(() => ({ refName: '123-abc', remainingRef: undefined }));
}
function NESTED_ref() {
  this.ref = '123-abc/nested/456-def';

  mockSplitNextDocRef
    .mockImplementationOnce(() => ({ refName: '123-abc', remainingRef: 'nested/456-def' }))
    .mockImplementationOnce(() => ({ refName: 'nested', remainingRef: '456-def' }))
    .mockImplementationOnce(() => ({ refName: '456-def', remainingRef: undefined }));
}

function mock_child() {
  this.mock_child = { id: '123-abc', documentData: { data: 'value' } };
  this.mock_subcollection = { id: 'nested' };
  this.nested_child = { id: '456-def', documentData: { data: 'value' } };

  mockGetOrCreateChild
    .mockImplementationOnce(() => this.mock_child)
    .mockImplementationOnce(() => this.mock_subcollection)
    .mockImplementationOnce(() => this.nested_child);
}
function mock_clone() {
  mockCloneForSnapshot.mockImplementationOnce(cloneDeep);
}

function getting_document_WITHOUT_mock_data() {
  this.result = getDocument(undefined, undefined)(this.ref);
}
function getting_document_WITH_mock_data() {
  this.result = getDocument(undefined, undefined)(this.ref, { cat: 'meow' });
}

function child_is_returned() {
  expect(this.result).toBe(this.mock_child);
}
function NESTED_child_is_returned() {
  expect(this.result).toBe(this.nested_child);
}
function result_is_NOT_direct_child() {
  expect(this.result).not.toBe(this.mock_child);
}
function result_has_MOCK_DATA() {
  expect(this.result).toEqual(expect.objectContaining({
    documentData: {
      cat: 'meow',
    },
  }));
}
function result_DOES_NOT_have_ORIGINAL_DATA() {
  expect(this.result).not.toEqual(expect.objectContaining({
    documentData: {
      data: 'value',
    },
  }));
}
function direct_child_is_NOT_MODIFIED() {
  expect(this.mock_child).toEqual({
    id: '123-abc',
    documentData: {
      data: 'value',
    },
  });
}
