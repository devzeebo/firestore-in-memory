import test from 'jest-gwt';
import Transaction from '.';

describe('transaction', () => {
  test('transaction mock GET is pass through', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      GETTING_ref,
    },
    then: {
      log_has_GET,
      ref_is_gotten,
    },
  });

  test('transaction mock SET is pass through', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      SETTING_ref,
      committing_transaction,
    },
    then: {
      log_has_SET,
      ref_is_set,
    },
  });

  test('transaction mock UPDATE is pass through', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      UPDATING_ref,
      committing_transaction,
    },
    then: {
      log_has_UPDATE,
    },
  });

  test('multiple sets', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      SETTING_ref,
      UPDATING_ref,
      committing_transaction,
    },
    then: {
      log_has_SET,
      log_has_UPDATE,
    },
  });

  test('transaction does NOT allow get after set', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      SETTING_ref,
      GETTING_ref,
    },
    then: {
      expect_error,
    },
  });

  test('transaction does NOT allow get after update', {
    given: {
      transaction,
      mock_ref,
    },
    when: {
      UPDATING_ref,
      GETTING_ref,
    },
    then: {
      expect_error,
    },
  });
});

function transaction() {
  this.transaction = new Transaction();
}
function mock_ref() {
  this.data = {};
  this.options = {};

  this.mock_ref = {
    path: '123-abc',

    get: jest.fn(() => this.data),

    set: jest.fn(),

    update: jest.fn(),
  };
}

async function GETTING_ref() {
  this.get_result = await this.transaction.get(this.mock_ref);
}
async function SETTING_ref() {
  await this.transaction.set(
    this.mock_ref,
    this.data,
    this.options,
  );
}
async function UPDATING_ref() {
  await this.transaction.update(
    this.mock_ref,
    this.data,
  );
}
async function committing_transaction() {
  await this.transaction.commit();
}

function log_has_GET() {
  expect(this.transaction.log).toEqual(expect.arrayContaining([{
    op: 'get',
    path: '123-abc',
  }]));
}
function log_has_SET() {
  expect(this.transaction.log).toEqual(expect.arrayContaining([{
    op: 'set',
    path: '123-abc',
    data: this.data,
    opts: this.options,
  }]));
}
function log_has_UPDATE() {
  expect(this.transaction.log).toEqual(expect.arrayContaining([{
    op: 'update',
    path: '123-abc',
    data: this.data,
  }]));
}
function ref_is_gotten() {
  expect(this.mock_ref.get).toHaveBeenCalled();
  expect(this.get_result).toBe(this.data);
}
function ref_is_set() {
  expect(this.mock_ref.set).toHaveBeenCalledWith(
    this.data,
    this.options,
  );
}
function ref_is_updated() {
  expect(this.mock_ref.update).toHaveBeenCalledWith(
    this.data,
  );
}
function expect_error(e) {
  expect(e.message).toEqual('Cannot call get in a transaction after set or update');
}
