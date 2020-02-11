/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import sizeProp from './size';

describe('firestore interface::size', () => {
  test('document with EMPTY children', {
    given: {
      mock_document_with_EMPTY_children,
    },
    when: {
      getting_size,
    },
    then: {
      size_is_ZERO,
    },
  });

  test('document with children', {
    given: {
      mock_document_WITH_FIVE_children,
    },
    when: {
      getting_size,
    },
    then: {
      size_is_FIVE,
    },
  });

  test('document with UNDEFINED children', {
    given: {
      mock_document_with_UNDEFINED_children,
    },
    when: {
      getting_size,
    },
    then: {
      size_is_ZERO,
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
function mock_document_WITH_FIVE_children() {
  this.document = {
    children: {
      a: {},
      b: {},
      c: {},
      d: {},
      e: {},
    },
  };
}

function getting_size() {
  this.result = sizeProp(this.document).get();
}

function size_is_ZERO() {
  expect(this.result).toBe(0);
}
function size_is_FIVE() {
  expect(this.result).toBe(5);
}
