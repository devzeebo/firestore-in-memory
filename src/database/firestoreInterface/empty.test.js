/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import emptyProp from './empty';

describe('firestore interface::empty', () => {
  test('document with EMPTY children', {
    given: {
      mock_document_with_EMPTY_children,
    },
    when: {
      getting_empty,
    },
    then: {
      empty_is_TRUE,
    },
  });

  test('document with children', {
    given: {
      mock_document_WITH_children,
    },
    when: {
      getting_empty,
    },
    then: {
      empty_is_FALSE,
    },
  });

  test('document with UNDEFINED children', {
    given: {
      mock_document_with_UNDEFINED_children,
    },
    when: {
      getting_empty,
    },
    then: {
      empty_is_TRUE,
    },
  });
});

function mock_document_with_EMPTY_children() {
  this.document = {
    children: {},
  };
}
function mock_document_with_UNDEFINED_children() {
  this.document = {
    children: undefined,
  };
}
function mock_document_WITH_children() {
  this.document = {
    children: {
      a: {},
      b: {},
    },
  };
}

function getting_empty() {
  this.result = emptyProp(this.document).get();
}

function empty_is_TRUE() {
  expect(this.result).toBe(true);
}
function empty_is_FALSE() {
  expect(this.result).toBe(false);
}
