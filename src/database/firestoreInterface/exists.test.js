/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import existsProp from './exists';

describe('firestore interface::exists', () => {
  test('exists checks internal prop (true)', {
    given: {
      mock_document_with_internal_exists_TRUE,
    },
    when: {
      getting_exists,
    },
    then: {
      exists_is_TRUE,
    },
  });

  test('exists checks internal prop (false)', {
    given: {
      mock_document_with_internal_exists_FALSE,
    },
    when: {
      getting_exists,
    },
    then: {
      exists_is_FALSE,
    },
  });

  test('missing internal prop is false', {
    given: {
      mock_document_with_MISSING_internal_exists,
    },
    when: {
      getting_exists,
    },
    then: {
      exists_is_FALSE,
    },
  });
});

function mock_document_with_internal_exists_TRUE() {
  this.document = {
    __exists: true,
  };
}
function mock_document_with_internal_exists_FALSE() {
  this.document = {
    __exists: false,
  };
}
function mock_document_with_MISSING_internal_exists() {
  this.document = {
    __exists: undefined,
  };
}
function getting_exists() {
  this.result = existsProp(this.document).get();
}
function exists_is_TRUE() {
  expect(this.result).toBe(true);
}

function exists_is_FALSE() {
  expect(this.result).toBe(false);
}
