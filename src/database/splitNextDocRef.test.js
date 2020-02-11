/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import splitNextDocRef from './splitNextDocRef';

describe('split next doc ref', () => {
  test('direct path', {
    given: {
      DIRECT_path,
    },
    when: {
      splitting_path,
    },
    then: {
      REF_NAME_is_PATH,
      REMAINING_REF_is_EMPTY_string,
    },
  });

  test('nested path', {
    given: {
      NESTED_path,
    },
    when: {
      splitting_path,
    },
    then: {
      REF_NAME_has_NO_slashes,
      REMAINING_REF_is_rest_of_path,
    },
  });
});

function NESTED_path() {
  this.path = '123-abc/subcollection/456-def';
}
function DIRECT_path() {
  this.path = '123-abc';
}

function splitting_path() {
  this.result = splitNextDocRef(this.path);
}

function REF_NAME_has_NO_slashes() {
  expect(this.result.refName).not.toEqual(expect.stringContaining('/'));
}
function REF_NAME_is_PATH() {
  expect(this.result.refName).toBe('123-abc');
}
function REMAINING_REF_is_rest_of_path() {
  expect(this.result.remainingRef).toEqual('subcollection/456-def');
}
function REMAINING_REF_is_EMPTY_string() {
  expect(this.result.remainingRef).toEqual('');
}
