/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import createMockFirestoreDocument from './createMockFirestoreDocument';

import getDocument from './getDocument';
import setDocument from './setDocument';
import augmentWithFirestoreInterface from './firestoreInterface';

jest.mock('./getDocument');
jest.mock('./setDocument');
jest.mock('./firestoreInterface');

describe('create mock firestore document', () => {
  test('falsy parent path is empty string', {
    given: {
      document_with_NO_PARENT,
    },
    when: {
      creating_mock_document,
    },
    then: {
      path_is_EMPTY_STRING,
    },
  });

  test('path is parent path/id', {
    given: {
      id,
      document_WITH_PARENT,
    },
    when: {
      creating_mock_document,
    },
    then: {
      path_is_PARENT_PATH_slash_ID,
    },
  });

  test('mock document has getDocument', {
    given: {
      mock_getDocument_partial,
    },
    when: {
      creating_mock_document,
    },
    then: {
      mock_document_is_bound,
    },
  });

  test('mock document has setDocument', {
    given: {
      mock_setDocument_partial,
    },
    when: {
      creating_mock_document,
    },
    then: {
      mock_document_is_bound,
    },
  });

  test('mock document implements firestore interface', {
    given: {
      mock_firestore_augment,
    },
    when: {
      creating_mock_document,
    },
    then: {
      mock_document_is_bound,
    },
  });
});

function id() {
  this.name = 'document';
}
function document_with_NO_PARENT() {
  this.parent = null;
}
function document_WITH_PARENT() {
  this.parent = {
    path: 'path-to-parent/subcollection',
  };
}
function mock_getDocument_partial() {
  getDocument.mockImplementationOnce((bound_doc, bound_creator) => {
    this.bound_doc = bound_doc;
    this.bound_creator = bound_creator;
  });
}
function mock_setDocument_partial() {
  setDocument.mockImplementationOnce((bound_doc, bound_creator) => {
    this.bound_doc = bound_doc;
    this.bound_creator = bound_creator;
  });
}
function mock_firestore_augment() {
  augmentWithFirestoreInterface.mockImplementationOnce((bound_doc, bound_creator) => {
    this.bound_doc = bound_doc;
    this.bound_creator = bound_creator;
  });
}
function creating_mock_document() {
  this.result_mock_document = createMockFirestoreDocument(
    this.name,
    this.parent,
    { isCollection: this.isCollection, exists: this.exists },
  );
}
function path_is_EMPTY_STRING() {
  expect(this.result_mock_document.path).toBe('');
}
function mock_document_is_bound() {
  expect(this.bound_doc).toBe(this.result_mock_document);
  expect(this.bound_creator).toBe(createMockFirestoreDocument);
}
function path_is_PARENT_PATH_slash_ID() {
  expect(this.result_mock_document.path).toBe('path-to-parent/subcollection/document');
}
