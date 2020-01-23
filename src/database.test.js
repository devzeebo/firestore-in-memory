/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import testContext from 'jest-gwt';
import fill from 'lodash/fill';
import split from 'lodash/fp/split';
import get from 'lodash/fp/get';
import join from 'lodash/fp/join';
import zipAll from 'lodash/fp/zipAll';
import flatten from 'lodash/fp/flatten';
import flow from 'lodash/fp/flow';
import MockDb from './database';

describe('database tests', () => {
  testContext('set document builds nested paths', {
    given: {
      mock_db,
      nested_document_path,
      document_data_to_set,
    },
    when: {
      setting_document,
    },
    then: {
      nested_path_is_created,
    },
  });

  testContext('get document', {
    given: {
      mock_db,
      document_exists,
    },
    when: {
      getting_document,
    },
    then: {
      document_is_returned,
    },
  });

  testContext('get missing document', {
    given: {
      mock_db,
      nested_document_path,
    },
    when: {
      getting_document,
    },
    then: {
      document_does_NOT_exist,
    },
  });
});

const getRawPath = (path) => {
  const splitPath = split('/')(path);
  const collections = fill(new Array(splitPath.length), 'collections');

  return flow(
    zipAll,
    flatten,
    join('.'),
    (rawPath) => `${rawPath}.documentData`,
  )([collections, splitPath]);
};

function mock_db() {
  this.mock_db = new MockDb();
}
function nested_document_path() {
  this.document_path = 'col/doc/subcol/doc';
  this.raw_document_path = getRawPath(this.document_path);
}
function document_data_to_set() {
  this.document_object = { key: 'value' };
}
function document_exists() {
  this.document_path = 'col/doc';
  this.mock_db.setDocument(this.document_path, { key: 'value' });
}

function setting_document() {
  this.mock_db.setDocument(this.document_path, this.document_object);
}
function getting_document() {
  this.result = this.mock_db.getDocument(this.document_path);
}

function nested_path_is_created() {
  expect(get(this.raw_document_path)(this.mock_db)).toEqual({
    key: 'value',
  });
}
function document_is_returned() {
  expect(this.result.exists).toBe(true);
  expect(get('documentData')(this.result)).toEqual({
    key: 'value',
  });
}
function document_does_NOT_exist() {
  expect(this.result.exists).toBe(false);
}
