/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import set from './set';

describe('firestore interface::set', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('no opts overwrites entire data', {
    given: {
      mock_document,
      data,
    },
    when: {
      setting_ref_WITHOUT_OPTS,
    },
    then: {
      document_data_is_OVERWRITTEN,
    },
  });

  test('merge false overwrites entire data', {
    given: {
      mock_document,
      data,
    },
    when: {
      setting_ref_with_MERGE_FALSE,
    },
    then: {
      document_data_is_OVERWRITTEN,
    },
  });

  test('merge true deeply merges existing data', {
    given: {
      mock_document,
      data,
    },
    when: {
      setting_ref_with_MERGE_TRUE,
    },
    then: {
      document_data_is_MERGED,
    },
  });

  test('merge true with no data', {
    given: {
      mock_document_WITHOUT_data,
      data,
    },
    when: {
      setting_ref_with_MERGE_TRUE,
    },
    then: {
      document_data_is_OVERWRITTEN,
    },
  });

  test('merge object with array overwrites array', {
    given: {
      mock_document_WITH_array,
      data_with_NEW_array,
    },
    when: {
      setting_ref_with_MERGE_TRUE,
    },
    then: {
      document_data_array_is_NEW_array,
    },
  });
});

function mock_document() {
  this.mock_set_document = jest.fn();
  this.document = {
    path: '123-abc/nested/456-def',
    database: {
      setDocument: this.mock_set_document,
    },
    documentData: {
      cat: {
        name: 'Maowser',
        sound: 'meow',
      },
    },
  };
}

function mock_document_WITHOUT_data() {
  this.mock_set_document = jest.fn();
  this.document = {
    path: '123-abc/nested/456-def',
    database: {
      setDocument: this.mock_set_document,
    },
  };
}

function mock_document_WITH_array() {
  this.mock_set_document = jest.fn();
  this.document = {
    path: '123-abc/nested/456-def',
    database: {
      setDocument: this.mock_set_document,
    },
    documentData: {
      nested: {
        array: [1, 2, 3],
      },
      otherValue: 'cat',
    }
  };
}

function data() {
  this.data = {
    dog: {
      name: 'Havoc',
    },
    cat: {
      name: 'Pixel',
    },
  };
}

function data_with_NEW_array() {
  this.data = {
    nested: {
      array: [4, 5],
    },
  };
}

async function setting_ref_WITHOUT_OPTS() {
  await set(this.document)(this.data);
}

async function setting_ref_with_MERGE_FALSE() {
  await set(this.document)(this.data, { merge: false });
}

async function setting_ref_with_MERGE_TRUE() {
  await set(this.document)(this.data, { merge: true });
}

function document_data_is_OVERWRITTEN() {
  expect(this.mock_set_document.mock.calls[0][1]).toEqual(this.data);
}

function document_data_is_MERGED() {
  expect(this.mock_set_document.mock.calls[0][1]).toEqual({
    cat: {
      name: 'Pixel',
      sound: 'meow',
    },
    dog: {
      name: 'Havoc',
    },
  });
}

function document_data_array_is_NEW_array() {
  expect(this.mock_set_document.mock.calls[0][1]).toEqual({
    nested: {
      array: [4, 5],
    },
    otherValue: 'cat',
  });
}
