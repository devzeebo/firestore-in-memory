/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import {
  flow, map, get, invoke,
} from 'lodash/fp';

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

  test('query snap has data', {
    given: {
      mock_db,
    },
    when: {
      creating_document_WITH_CHILDREN,
      getting_document_WITH_CHILDREN,
      getting_ALL_CHILDREN,
    },
    then: {
      children_have_data,
    },
  });

  test('snap data is frozen', {
    given: {
      mock_db,
    },
    when: {
      setting_FIRST_LEVEL_document,
      getting_FIRST_LEVEL_document,
      modifying_FIRST_LEVEL_document_data,
    },
    then: {
      snap_data_is_NOT_modified,
    },
  });

  test('generic update operation', {
    given: {
      mock_db,
      document,
    },
    when: {
      updating_document,
    },
    then: {
      snap_data_is_NOT_modified,
      mock_db_has_UPDATED_data,
      updated_snap_has_UPDATED_data,
    },
  });

  test('transaction update operation', {
    given: {
      mock_db,
      document,
    },
    when: {
      updating_document_IN_TRANSACTION,
    },
    then: {
      all_ops_in_transaction,
      snap_data_is_NOT_modified,
      mock_db_has_UPDATED_data,
      updated_snap_has_UPDATED_data,
    },
  });
});

function mock_db() {
  this.mock_db = createMockDb();
}
function document() {
  this.mock_db.setDocument('col/123-abc', { cat: 'meow' });
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
function modifying_FIRST_LEVEL_document_data() {
  this.mock_db.setDocument('col/123-abc', {
    dog: 'woof',
  });
}
async function updating_document() {
  this.result_ref = this.mock_db.collection('col').doc('123-abc');
  this.result_snapshot = await this.result_ref.get();

  await this.result_ref.set({ dog: 'woof' });

  this.updated_result_snapshot = await this.result_ref.get();
}
async function updating_document_IN_TRANSACTION() {
  await this.mock_db.runTransaction(async (trans) => {
    this.result_ref = this.mock_db.collection('col').doc('123-abc');
    this.result_snapshot = await trans.get(this.result_ref);

    await trans.set(this.result_ref, { dog: 'woof' });
  });

  this.updated_result_snapshot = await this.result_ref.get();
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
function snap_data_is_NOT_modified() {
  expect(this.result_snapshot.data()).toEqual({
    cat: 'meow',
  });
}
function mock_db_has_UPDATED_data() {
  expect(get('children.col.children.123-abc.documentData')(this.mock_db)).toEqual({
    dog: 'woof',
  });
}
function updated_snap_has_UPDATED_data() {
  expect(this.updated_result_snapshot.data()).toEqual({
    dog: 'woof',
  });
}
function all_ops_in_transaction() {
  expect(this.mock_db.transaction.log).toEqual(expect.arrayContaining([
    { op: 'get', path: 'col/123-abc' },
    expect.objectContaining({ op: 'set', path: 'col/123-abc', data: { dog: 'woof' } }),
  ]));
}
function creating_document_WITH_CHILDREN() {
  this.mock_db.setDocument('col/doc/subcol/foo', { test: 'it' });
  this.mock_db.setDocument('col/doc/subcol/bar', { test: 'it' });
}
async function getting_document_WITH_CHILDREN() {
  this.result_ref = this.mock_db.collection('col').doc('doc');
}
async function getting_ALL_CHILDREN() {
  this.children_snaps = await this.result_ref.collection('subcol').get();
}
function children_have_data() {
  expect(flow(
    get('docs[0]'),
    invoke('data'),
  )(this.children_snaps))
    .toEqual({
      test: 'it',
    });
}
