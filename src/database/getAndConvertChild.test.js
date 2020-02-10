/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import get from 'lodash/fp/get';

import getAndConvertChild from './getAndConvertChild';
import { getChild } from './getChild';

jest.mock('./getChild');

describe('get and convert child', () => {
  test('binds getChild to params', {
    given: {
      converter,
      mock_getChild,
    },
    when: {
      getting_and_converting,
    },
    then: {
      getChild_is_bound_to_params,
    },
  });

  test('converter passed returned child', {
    given: {
      converter,
      mock_getChild,
    },
    when: {
      getting_and_converting,
    },
    then: {
      converter_is_passed_returned_child,
    },
  });
});

function mock_getChild() {
  getChild.mockImplementation((doc, creator) => {
    this.getChild_doc = doc;
    this.getChild_creator = creator;

    return (name) => ({ id: name, cat: 'meow' });
  });
}
function converter() {
  this.converter = jest.fn((child) => {
    this.converter_param = child;

    return child.name;
  });
}

function getting_and_converting() {
  this.passed_doc = {};
  this.passed_creator = jest.fn();

  this.passed_name = '123-abc';

  this.result = getAndConvertChild(
    this.converter, this.passed_doc, this.passed_creator,
  )(this.passed_name);
}

function getChild_is_bound_to_params() {
  expect(this.getChild_doc).toBe(this.passed_doc);
  expect(this.getChild_creator).toBe(this.passed_creator);
}
function converter_is_passed_returned_child() {
  expect(this.converter_param).toEqual({
    id: '123-abc',
    cat: 'meow',
  });
}
