/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import { map } from 'lodash/fp';

import cloneForSnapshot from './cloneForSnapshot';

describe('clone for snapshot', () => {
  test('creates a new mock document', {
    given: {
      document,
      mock_create_document,
    },
    when: {
      cloning_document,
    },
    then: {
      create_document_called_with_SAME_values_as_document,
      clone_DOCUMENT_DATA_is_ORIGINAL_DOCUMENT_DATA,
      clone_has_SNAP_DATA,
      clone_has_ORIGINAL_CHILDREN,
      SNAP_DATA_is_CLONED,
    },
  });
});

function document() {
  this.document = {
    isCollection: 'collection value',
    exists: 'exists value',
    documentData: {
      data: 'value',
    },
    children: {
      '123-abc': {},
      '456-def': {},
    },
  };
}

function mock_create_document() {
  this.created_docs = [];
  this.create_mock_document = jest.fn((id, parent, args) => {
    const created_doc = {
      id,
      parent,
      args,
    };
    this.created_docs.push(created_doc);

    return created_doc;
  });
}

function cloning_document() {
  this.result = cloneForSnapshot(this.document, this.create_mock_document);
}

function create_document_called_with_SAME_values_as_document() {
  expect(this.created_docs[0]).not.toBeUndefined();
  expect(this.created_docs[0].args).not.toBeUndefined();
  expect(this.created_docs[0].args.isCollection).toBe('collection value');
  expect(this.created_docs[0].args.exists).toBe('exists value');
}
function clone_DOCUMENT_DATA_is_ORIGINAL_DOCUMENT_DATA() {
  expect(this.result.documentData).not.toBeUndefined();
  expect(this.result.documentData).toBe(this.document.documentData);
}
function clone_has_SNAP_DATA() {
  expect(this.result.snapData).not.toBeUndefined();
}
function clone_has_ORIGINAL_CHILDREN() {
  expect(this.result.children).toEqual(expect.arrayContaining(map(expect.objectContaining)(this.document.children)));
}
function SNAP_DATA_is_CLONED() {
  expect(this.result.snapData).not.toBe(this.document.documentData);
  expect(this.result.snapData).toEqual(this.document.documentData);
}
