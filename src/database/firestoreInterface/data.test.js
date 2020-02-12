/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import dataFunc from './data';

describe('firestore interface::data', () => {
  test('gets data from snap data', {
    given: {
      mock_document,
    },
    when: {
      getting_data,
    },
    then: {
      document_snap_data_is_returned,
    },
  });
});

function mock_document() {
  this.document = {
    snapData: {},
  };
}
function getting_data() {
  const data = dataFunc(this.document);
  this.result = data();
}

function document_snap_data_is_returned() {
  expect(this.result).toBe(this.document.snapData);
}
