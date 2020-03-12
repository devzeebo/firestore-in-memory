import test from 'jest-gwt';

import equal from './equal';

describe('where equal', () => {
  test('number equal is TRUE', {
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

  test('word equal is TRUE', {
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

  test('number NOT equal is FALSE', {
    given: {
      data_value_NOT_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('word NOT equal is FALSE', {
    given: {
      word_data_value_NOT_EQUAL_TO_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('word data equal number query is FALSE', {
    given: {
      word_data_value_EQUAL_TO_number_query_value,
    },
    when: {
      executing_filter,
    },
    then: {
      FALSE_is_returned,
    },
  });

  test('number data equal word query is FALSE', {
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

function data_value_EQUAL_TO_query_value() {
  this.func = equal(10);
  this.data_value = 10;
}
function data_value_NOT_EQUAL_TO_query_value() {
  this.func = equal(5);
  this.data_value = 10;
}
function word_data_value_EQUAL_TO_query_value() {
  this.func = equal('dog');
  this.data_value = 'dog';
}
function word_data_value_NOT_EQUAL_TO_query_value() {
  this.func = equal('cat');
  this.data_value = 'dog';
}
function word_data_value_EQUAL_TO_number_query_value() {
  this.func = equal(10);
  this.data_value = '10';
}
function number_data_value_EQUAL_TO_word_query_value() {
  this.func = equal('10');
  this.data_value = 10;
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
