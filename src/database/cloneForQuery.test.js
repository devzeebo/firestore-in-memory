/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import cloneForQuery from './cloneForQuery';

describe('clone for query', () => {
  test('creates filters if none exist', {
    given: {
      document_WITHOUT_filters,
      new_filter,
      mock_create_document,
    },
    when: {
      cloning_document,
    },
    then: {
      document_has_NEW_filter,
    },
  });

  test('persists existing filters', {
    given: {
      document_WITH_filters,
      new_filter,
      mock_create_document,
    },
    when: {
      cloning_document,
    },
    then: {
      document_has_NEW_filter,
      document_has_EXISTING_filter,
    },
  });
});

function document_WITHOUT_filters() {
  this.document = {
    filters: undefined,
  };
}
function document_WITH_filters() {
  this.existing_filter = jest.fn();
  this.document = {
    filters: [this.existing_filter],
  };
}
function new_filter() {
  this.new_filter = jest.fn();
}
function mock_create_document() {
  this.mock_create_document = jest.fn((id, parent, args) => {
    this.created_doc = {
      id,
      parent,
      args,
    };
    return this.created_doc;
  });
}
function cloning_document() {
  this.result = cloneForQuery(this.document, this.mock_create_document, this.new_filter);
}
function document_has_NEW_filter() {
  expect(this.result.filters).toEqual(expect.arrayContaining([
    this.new_filter,
  ]));
}
function document_has_EXISTING_filter() {
  expect(this.result.filters).toEqual(expect.arrayContaining([
    this.existing_filter,
  ]));
}
