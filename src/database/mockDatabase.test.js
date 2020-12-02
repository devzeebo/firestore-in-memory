/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import {
  map,
} from 'lodash/fp';

import createMockDb from './mockDatabase';

import mock_createMockFirestoreDocument from './createMockFirestoreDocument';
import Transaction from './transaction';

jest.mock('./createMockFirestoreDocument');
jest.mock('./transaction');

describe('mock database', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('sets up database correctly', {
    given: {
      mock_firestore_document,
    },
    when: {
      creating_mock_db,
    },
    then: {
      db_IS_firestore_document,
      db_has_transaction_methods,
      db_is_reset,
    },
  });

  test('run transaction executes func and passes mock transaction', {
    given: {
      mock_db,
      transaction_function,
    },
    when: {
      running_a_transaction,
    },
    then: {
      transaction_function_called_with_transaction,
      transaction_is_COMMITTED,
      transaction_function_executed_BEFORE_commit,
    },
  });
});

const tracked_promise = (name, call_order) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      call_order.push({ name, promise });
      resolve();
    });
  });

  return promise;
};

function mock_db() {
  this.document = {};
  this.call_order = [];
  mock_createMockFirestoreDocument.mockImplementationOnce(() => this.document);

  this.test_mock_db = createMockDb();

  Transaction.mockImplementation(() => ({
    commit: jest.fn(() => tracked_promise('commit', this.call_order)),
  }));
}

function transaction_function() {
  this.transaction_fn = jest.fn(() => tracked_promise('transaction function', this.call_order));
}

function mock_firestore_document() {
  this.document = {};
  mock_createMockFirestoreDocument.mockImplementationOnce(() => this.document);
}

function creating_mock_db() {
  this.test_mock_db = createMockDb();
}

async function running_a_transaction() {
  await this.test_mock_db.runTransaction(this.transaction_fn);
}

function db_IS_firestore_document() {
  expect(this.test_mock_db).toBe(this.document);
}

function db_has_transaction_methods() {
  expect(this.test_mock_db).toEqual(expect.objectContaining({
    runTransaction: expect.any(Function),
  }));
}

function db_is_reset() {
  expect(this.test_mock_db.transaction).toBeNull();
  expect(this.test_mock_db.children).toEqual({});
}

function transaction_function_called_with_transaction() {
  expect(this.transaction_fn).toHaveBeenCalledTimes(1);
  expect(this.transaction_fn.mock.calls[0][0]).toBe(this.test_mock_db.transaction);
}

async function transaction_function_executed_BEFORE_commit() {
  expect(map('name', this.call_order)).toEqual(['transaction function', 'commit']);
}

function transaction_is_COMMITTED() {
  expect(this.test_mock_db.transaction.commit).toHaveBeenCalled();
}
