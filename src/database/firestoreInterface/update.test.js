/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import update from './update';

describe('firestore interface::update', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('shallow merge', {
    given: {
      mock_document,
      data,
    },
    when: {
      updating_ref,
    },
    then: {
      document_data_is_SHALLOW_MERGED,
    },
  });

  test('no existing data', {
    given: {
      mock_document_WITHOUT_data,
      data,
    },
    when: {
      updating_ref,
    },
    then: {
      document_data_is_SHALLOW_MERGED,
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

async function updating_ref() {
  await update(this.document)(this.data);
}

function document_data_is_SHALLOW_MERGED() {
  expect(this.mock_set_document.mock.calls[0][1]).toEqual({
    cat: {
      name: 'Pixel',
    },
    dog: {
      name: 'Havoc',
    },
  });
}
