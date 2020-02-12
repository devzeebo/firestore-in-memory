/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import get from 'lodash/fp/get';

import setDocument from './setDocument';

import mock_splitNextDocRef from './splitNextDocRef';
import mock_getOrCreateChild from './getChild';

jest.mock('./splitNextDocRef');
jest.mock('./getChild');

describe('set document', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('direct reference', {
    given: {
      ROOT_document,
      DIRECT_ref,
      data,
      mock_children,
    },
    when: {
      setting_document,
    },
    then: {
      CHILD_is_in_ROOT_children,
      DIRECT_child_data_is_PASSED_data,
      child_exists,
    },
  });

  test('nested reference', {
    given: {
      ROOT_document,
      NESTED_ref,
      data,
      mock_children,
    },
    when: {
      setting_document,
    },
    then: {
      CHILD_passed_recursively,
      NESTED_child_data_is_PASSED_data,
      child_exists,
    },
  });
});

function ROOT_document() {
  this.root = {
    children: {},
  };
}
function DIRECT_ref() {
  this.ref = '123-abc';
  mock_splitNextDocRef
    .mockImplementationOnce(() => ({ refName: '123-abc', remainingRef: undefined }));
}
function NESTED_ref() {
  this.ref = '123-abc/nested/456-def';
  mock_splitNextDocRef
    .mockImplementationOnce(() => ({ refName: '123-abc', remainingRef: 'nested/456-def' }))
    .mockImplementationOnce(() => ({ refName: 'nested', remainingRef: '456-def' }))
    .mockImplementationOnce(() => ({ refName: '456-def', remainingRef: undefined }));
}
function data() {
  this.data = {
    cat: 'meow',
  };
}
function mock_children() {
  this.mock_child = { id: '123-abc', documentData: { data: 'value' } };
  this.mock_subcollection = { id: 'nested' };
  this.nested_child = { id: '456-def', documentData: { data: 'value' } };

  mock_getOrCreateChild
    .mockImplementationOnce(() => this.mock_child)
    .mockImplementationOnce(() => this.mock_subcollection)
    .mockImplementationOnce(() => this.nested_child);
}
function setting_document() {
  setDocument(this.root, undefined)(this.ref, this.data);
}

function CHILD_is_in_ROOT_children() {
  expect(get('children.123-abc')(this.root)).not.toBeUndefined();
}
function DIRECT_child_data_is_PASSED_data() {
  expect(get('children.123-abc.documentData')(this.root)).toEqual({
    cat: 'meow',
  });
}
function CHILD_passed_recursively() {
  expect(mock_getOrCreateChild.mock.calls[0][0]).toBe(this.root);
  expect(mock_getOrCreateChild.mock.calls[1][0]).toBe(this.mock_child);
  expect(mock_getOrCreateChild.mock.calls[2][0]).toBe(this.mock_subcollection);
}
function child_exists() {
  expect(mock_getOrCreateChild.mock.calls[0][2].exists).toBe(true);
}
function NESTED_child_data_is_PASSED_data() {
  expect(get('children.123-abc.children.nested.children.456-def.documentData')(this.root))
    .toEqual({ cat: 'meow' });
}
