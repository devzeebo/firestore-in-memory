/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import keys from 'lodash/fp/keys';

import augment from './index';

describe('firestore interface augment', () => {
  test('augment has getter props', {
    given: {
      mock_document,
    },
    when: {
      augmenting_with_firestore_interface,
    },
    then: {
      document_has_getter_props,
    },
  });

  test('augment has firestore methods', {
    given: {
      mock_document,
    },
    when: {
      augmenting_with_firestore_interface,
    },
    then: {
      document_has_firestore_methods,
    },
  });
});

function mock_document() {
  this.document = {};
}

function augmenting_with_firestore_interface() {
  augment(this.document, undefined);
}

function document_has_getter_props() {
  const getters = keys(Object.getOwnPropertyDescriptors(this.document));
  expect(getters).toEqual(expect.arrayContaining([
    'exists',
    'size',
    'empty',
    'docs',
    'ref',
  ]));
}

function document_has_firestore_methods() {
  const methods = Object.getOwnPropertyNames(this.document);
  expect(methods).toEqual(expect.arrayContaining([
    'doc',
    'collection',
    'get',
    'set',
    'update',
  ]));
}
