/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import map from 'lodash/fp/map';

import createMockDb from './database/index';

describe('end to end tests', () => {
  test('set then get document', {
    given: {
      mock_db,
    },
    when: {
      setting_FIRST_LEVEL_document,
      getting_FIRST_LEVEL_document,
    },
    then: {
      result_is_document_ref,
      snapshot_EXISTS,
    },
  });

  test('get docs of collection', {
    given: {
      mock_db,
    },
    when: {
      setting_MULTIPLE_documents,
      getting_ALL_DOCUMENTS_in_collection,
    },
    then: {
      result_is_QUERY_snap,
      ALL_docs_are_doc_snaps,
    },
  });

  test('get non-existing document', {
    given: {
      mock_db,
    },
    when: {
      getting_snapshot_that_DOES_NOT_exist,
    },
    then: {
      snapshot_does_NOT_exist,
    },
  });

  test('deeply nested set and get', {
    given: {
      mock_db,
    },
    when: {
      setting_DEEP_document,
      getting_DEEP_document,
    },
    then: {
      result_is_document_ref,
      snapshot_EXISTS,
    },
  });
});

function mock_db() {
  this.mock_db = createMockDb();
}

function setting_FIRST_LEVEL_document() {
  this.mock_db.setDocument('col/123-abc', {
    cat: 'meow',
  });
}
async function getting_FIRST_LEVEL_document() {
  this.result_ref = this.mock_db.collection('col').doc('123-abc');
  this.result_snapshot = await this.result_ref.get();
}
function setting_MULTIPLE_documents() {
  this.mock_db.setDocument('col/123-abc', {
    cat: 'meow',
  });
  this.mock_db.setDocument('col/456-def', {
    dog: 'woof',
  });
}
function setting_DEEP_document() {
  this.mock_db.setDocument('col/123-abc/nested/456-def/subcollection/789-ghi', {
    cat: 'meow',
  });
}
async function getting_DEEP_document() {
  this.result_ref = this.mock_db
    .collection('col')
    .doc('123-abc')
    .collection('nested')
    .doc('456-def')
    .collection('subcollection')
    .doc('789-ghi');
  this.result_snapshot = await this.result_ref.get();
}
async function getting_ALL_DOCUMENTS_in_collection() {
  this.result_ref = this.mock_db.collection('col');
  this.result_snapshot = await this.result_ref.get();
}
async function getting_snapshot_that_DOES_NOT_exist() {
  this.result_ref = this.mock_db.collection('col').doc('not-exists').collection('sub').doc('123-abc');
  this.result_snapshot = await this.result_ref.get();
}

function result_is_document_ref() {
  expect(this.result_ref.__converterType).toBe('document ref');
}
function result_is_QUERY_snap() {
  expect(this.result_snapshot.__converterType).toBe('query snap');
}
function ALL_docs_are_doc_snaps() {
  expect(map('__converterType')(this.result_snapshot.docs)).toEqual([
    'document snap',
    'document snap',
  ]);
}
function snapshot_EXISTS() {
  expect(this.result_snapshot.exists).toBe(true);
}
function snapshot_does_NOT_exist() {
  expect(this.result_snapshot.exists).toBe(false);
}
