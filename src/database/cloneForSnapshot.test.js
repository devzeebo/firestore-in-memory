/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

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
  };
}

function mock_create_document() {
  this.create_mock_document = jest.fn((id, parent, args) => {
    this.created_doc = {
      id,
      parent,
      args,
    };

    return this.created_doc;
  });
}

function cloning_document() {
  this.result = cloneForSnapshot(this.document, this.create_mock_document);
}

function create_document_called_with_SAME_values_as_document() {
  expect(this.created_doc).not.toBeUndefined();
  expect(this.created_doc.args).not.toBeUndefined();
  expect(this.created_doc.args.isCollection).toBe('collection value');
  expect(this.created_doc.args.exists).toBe('exists value');
}
function clone_DOCUMENT_DATA_is_ORIGINAL_DOCUMENT_DATA() {
  expect(this.result.documentData).not.toBeUndefined();
  expect(this.result.documentData).toBe(this.document.documentData);
}
function clone_has_SNAP_DATA() {
  expect(this.result.snapData).not.toBeUndefined();
}
function SNAP_DATA_is_CLONED() {
  expect(this.result.snapData).not.toBe(this.document.documentData);
  expect(this.result.snapData).toEqual(this.document.documentData);
}
