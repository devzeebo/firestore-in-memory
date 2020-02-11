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
        name: 'Maoser',
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
