import test from 'jest-gwt';

import where from './where';
import mock_cloneForQuery from '../../cloneForQuery';

jest.mock('./operators', () => ({
  op: jest.fn((a, b) => a === b),
}));
jest.mock('../../cloneForQuery');

describe('where', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('bad operator', {
    given: {
      bad_operator,
      string_value,
    },
    when: {
      filtering_collection,
    },
    then: {
      expect_error: expect_operator_error,
    },
  });

  test('filters properly', {
    given: {
      mock_converters,
      ref_with_children,
      path,
      good_operator,
      string_value,
    },
    when: {
      filtering_collection,
    },
    then: {
      filters_children,
    },
  });
});

function ref_with_children() {
  this.document = {
    id: 'col-name',
    children: {
      '123-abc': {
        id: '123-abc',
        documentData: {
          path: { to: { field: 'cat' } },
        },
      },
      '456-def': {
        id: '456-def',
        documentData: {
          path: { to: { field: 'dog' } },
        },
      },
    },
  };
}
function path() {
  this.path = 'path.to.field';
}
function bad_operator() {
  this.operator = 'bad';
}
function good_operator() {
  this.operator = 'op';
}
function string_value() {
  this.query_value = 'dog';
}
function mock_converters() {
  mock_cloneForQuery
    .mockImplementation((query, _, newFilter) => (this.query = {
      ...query,
      filters: [...query.filters || [], newFilter],
    }));
}

function filtering_collection() {
  this.result = where(this.document, undefined)(this.path, this.operator, this.query_value);
}

function expect_operator_error(e) {
  expect(e.message).toEqual(`Operator [${this.operator}] not implemented`);
}
function filters_children() {
  expect(this.result.filters.length).toBe(1);
  expect(this.result.filters[0](this.document.children)).toEqual({
    '456-def': {
      id: '456-def',
      documentData: {
        path: { to: { field: 'dog' } },
      },
    },
  });
}
