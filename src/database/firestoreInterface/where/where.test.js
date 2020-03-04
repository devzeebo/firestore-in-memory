import test from 'jest-gwt';

import where from './where';

jest.mock('./operators', () => ({
  op: jest.fn(),
}));

describe('where', () => {
  test('bad operator', {
    given: {
      path,
      bad_operator,
      value,
    },
    when: {
      filtering_collection,
    },
    then: {
      expect_error: expect_operator_error,
    },
  });
});

function path() {
  this.path = 'data.path';
}
function bad_operator() {
  this.operator = 'bad';
}
function value() {
}

function filtering_collection() {
  this.result = where(this.path, this.operator, this.query_value);
}

function expect_operator_error(e) {
  expect(e.message).toEqual(`Operator [${this.operator}] not implemented`);
}
