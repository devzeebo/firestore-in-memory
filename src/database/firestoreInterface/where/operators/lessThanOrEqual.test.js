import test from 'jest-gwt';

import lessThanOrEqual from './lessThanOrEqual';

describe('where less than or equal', () => {
  test('number greater than returns FALSE', {
    given: {
      data_value_GREATER_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('word greater than returns FALSE', {
    given: {
      word_data_value_GREATER_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('number less than returns TRUE', {
    given: {
      data_value_LESS_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('word less than returns TRUE', {
    given: {
      word_data_value_LESS_THAN_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('number equal value returns TRUE', {
    given: {
      data_value_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('word equal value returns TRUE', {
    given: {
      word_data_value_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      TRUE_is_returned,
    },
  });

  test('different query type and data type is FALSE', {
    given: {
      number_data_value_EQUAL_TO_word_query_value,
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
  this.func = lessThanOrEqual(5);
  this.data_value = 10;
}
function data_value_LESS_THAN_query_value() {
  this.func = lessThanOrEqual(10);
  this.data_value = 5;
}
function data_value_EQUAL_TO_query_value() {
  this.func = lessThanOrEqual(10);
  this.data_value = 10;
}
function number_data_value_EQUAL_TO_word_query_value() {
  this.func = lessThanOrEqual('10');
  this.data_value = 10;
}
function word_data_value_GREATER_THAN_query_value() {
  this.func = lessThanOrEqual('cat');
  this.data_value = 'dog';
}
function word_data_value_LESS_THAN_query_value() {
  this.func = lessThanOrEqual('dog');
  this.data_value = 'cat';
}
function word_data_value_EQUAL_TO_query_value() {
  this.func = lessThanOrEqual('dog');
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
