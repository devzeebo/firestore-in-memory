/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import createMockDb from './mockDatabase';

import mock_createMockFirestoreDocument from './createMockFirestoreDocument';

jest.mock('./createMockFirestoreDocument');

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
      transaction_function_is_executed_with_MOCK_TRANSACTION,
    },
  });

  test('transaction mock GET is pass through', {
    given: {
      mock_db,
      mock_ref,
    },
    when: {
      calling_transaction_GET,
    },
    then: {
      mock_db_transaction_log_has_GET,
      ref_is_gotten,
    },
  });

  test('transaction mock SET is pass through', {
    given: {
      mock_db,
      mock_ref,
    },
    when: {
      calling_transaction_SET,
    },
    then: {
      mock_db_transaction_log_has_SET,
      ref_is_set,
    },
  });

  test('transaction mock UPDATE is pass through', {
    given: {
      mock_db,
      mock_ref,
    },
    when: {
      calling_transaction_UPDATE,
    },
    then: {
      mock_db_transaction_log_has_UPDATE,
      ref_is_updated,
    },
  });

  test('transaction does NOT allow get after set', {
    given: {
      mock_db,
      mock_ref,
    },
    when: {
      calling_transaction_SET,
      calling_transaction_GET,
    },
    then: {
      expect_error,
    },
  });

  test('transaction does NOT allow get after update', {
    given: {
      mock_db,
      mock_ref,
    },
    when: {
      calling_transaction_UPDATE,
      calling_transaction_GET,
    },
    then: {
      expect_error,
    },
  });
});

function mock_firestore_document() {
  this.document = {};
  mock_createMockFirestoreDocument.mockImplementationOnce(() => this.document);
}
function mock_db() {
  this.document = {};
  mock_createMockFirestoreDocument.mockImplementationOnce(() => this.document);

  this.test_mock_db = createMockDb();
}
function mock_ref() {
  this.mock_ref = {
    path: '123-abc',

    get_result: {},
    get: jest.fn(() => this.mock_ref.get_result),

    set_data: {},
    set_ops: {},
    set: jest.fn(),

    update_data: {},
    update: jest.fn(),
  };
}
function transaction_function() {
  this.transaction_function = jest.fn();
}

function creating_mock_db() {
  this.test_mock_db = createMockDb();
}
async function calling_transaction_GET() {
  this.get_result = await this.test_mock_db.transaction.get(this.mock_ref);
}
async function calling_transaction_SET() {
  await this.test_mock_db.transaction.set(
    this.mock_ref,
    this.mock_ref.set_data,
    this.mock_ref.set_opts,
  );
}
async function calling_transaction_UPDATE() {
  await this.test_mock_db.transaction.update(
    this.mock_ref,
    this.mock_ref.update_data,
  );
}
async function running_a_transaction() {
  await this.test_mock_db.runTransaction(this.transaction_function);
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
  expect(this.test_mock_db.transaction).toEqual(expect.objectContaining({
    get: expect.any(Function),
    set: expect.any(Function),
    update: expect.any(Function),
  }));
}
function mock_db_transaction_log_has_GET() {
  expect(this.test_mock_db.transaction.log).toEqual(expect.arrayContaining([{
    op: 'get',
    path: '123-abc',
  }]));
}
function mock_db_transaction_log_has_SET() {
  expect(this.test_mock_db.transaction.log).toEqual(expect.arrayContaining([{
    op: 'set',
    path: '123-abc',
    data: this.mock_ref.set_data,
    opts: this.mock_ref.set_opts,
  }]));
}
function mock_db_transaction_log_has_UPDATE() {
  expect(this.test_mock_db.transaction.log).toEqual(expect.arrayContaining([{
    op: 'update',
    path: '123-abc',
    data: this.mock_ref.update_data,
  }]));
}
function ref_is_gotten() {
  expect(this.mock_ref.get).toHaveBeenCalled();
  expect(this.get_result).toBe(this.mock_ref.get_result);
}
function ref_is_set() {
  expect(this.mock_ref.set).toHaveBeenCalledWith(
    this.mock_ref.set_data,
    this.mock_ref.set_opts,
  );
}
function ref_is_updated() {
  expect(this.mock_ref.update).toHaveBeenCalledWith(
    this.mock_ref.update_data,
  );
}
function transaction_function_is_executed_with_MOCK_TRANSACTION() {
  expect(this.transaction_function).toHaveBeenCalledWith(this.test_mock_db.transaction);
}
function expect_error(e) {
  expect(e.message).toEqual('Cannot call get in a transaction after set or update');
}
