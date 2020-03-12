import test from 'jest-gwt';

import greaterThan from './greaterThan';

describe('where greater than', () => {
  test('greater than returns TRUE', {
    given: {
      data_value_GREATER_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('word greater than returns TRUE', {
    given: {
      word_data_value_GREATER_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('less than returns FALSE', {
    given: {
      data_value_LESS_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('word less than returns FALSE', {
    given: {
      word_data_value_LESS_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('equal value returns FALSE', {
    given: {
      data_value_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('word equal value returns FALSE', {
    given: {
      word_data_value_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });
});

function data_value_GREATER_THAN_query_value() {
  this.func = greaterThan(5);
  this.data_value = 10;
}
function data_value_LESS_THAN_query_value() {
  this.func = greaterThan(10);
  this.data_value = 5;
}
function data_value_EQUAL_TO_query_value() {
  this.func = greaterThan(10);
  this.data_value = 10;
}
function word_data_value_GREATER_THAN_query_value() {
  this.func = greaterThan('cat');
  this.data_value = 'dog';
}
function word_data_value_LESS_THAN_query_value() {
  this.func = greaterThan('dog');
  this.data_value = 'cat';
}
function word_data_value_EQUAL_TO_query_value() {
  this.func = greaterThan('dog');
  this.data_value = 'dog';
}
function executing_filter() {
  this.result = this.func(this.data_value);
}
function TRUE_is_returned() {
  expect(this.result).toBe(true);
}
function FALSE_is_returned() {
  expect(this.result).toBe(false);
}
