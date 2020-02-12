/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import constant from 'lodash/fp/constant';
import get from 'lodash/fp/get';
import map from 'lodash/fp/map';
import identity from 'lodash/fp/identity';

import createConverterOfType from './createConverterOfType';

describe('create converter of type', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('converter func has converter props', {
    when: {
      creating_converter,
    },
    then: {
      converter_has_isTypeConverter_TRUE,
      converter_type_is_set,
    },
  });

  test('convert nil object', {
    given: {
      type_converter,
    },
    when: {
      converting_NIL_object,
    },
    then: {
      value_is_returned,
    },
  });

  test('recursive mapping', {
    given: {
      RECURSIVE_type_converter,
    },
    when: {
      converting_RECURSIVE_object,
    },
    then: {
      REFERENCE_LOOP_is_maintained,
    },
  });

  test('maps properties', {
    given: {
      type_converter,
    },
    when: {
      converting_object,
    },
    then: {
      values_are_converted,
    },
  });

  test('complex mapping', {
    given: {
      MULTIPLE_complex_converters,
    },
    when: {
      converting_COMPLEX_object,
    },
    then: {
      COMPLEX_values_are_converted,
    },
  });
});

function type_converter() {
  this.converter = createConverterOfType({
    a: get('length'),
    b: (it) => it * 2,
    c: identity,
    __converterType: constant('converter'),
  });
}
function RECURSIVE_type_converter() {
  const converter_props = {
    __converterType: constant('recursive'),
  };

  this.converter = createConverterOfType(converter_props);
  converter_props.recurse = this.converter;
}
function creating_converter() {
  this.converter = createConverterOfType({
    __converterType: constant('converter'),
  });
}

function converting_NIL_object() {
  this.result = this.converter(null);
}
function converting_object() {
  this.result = this.converter({
    a: 'cat',
    b: 8.5,
    c: {
      id: 'a complex object',
    },
  });
}
function converting_RECURSIVE_object() {
  const obj = {};
  obj.recurse = obj;

  this.result = this.converter(obj);
}

function converter_has_isTypeConverter_TRUE() {
  expect(this.converter.isTypeConverter).toBe(true);
}
function converter_type_is_set() {
  expect(this.converter.type()).toBe('converter');
}
function value_is_returned() {
  expect(this.result).toBe(null);
}
function REFERENCE_LOOP_is_maintained() {
  expect(this.result.recurse).toBe(this.result);
}
function values_are_converted() {
  expect(this.result).toEqual(expect.objectContaining({
    a: 3,
    b: 17,
    c: {
      id: 'a complex object',
    },
  }));
}

function MULTIPLE_complex_converters() {
  const first_converter_props = {
    a: identity,
    // second
    __converterType: constant('first'),
  };
  const second_converter_props = {
    b: identity,
    // first
    __converterType: constant('second'),
  };

  const first_converter = createConverterOfType(first_converter_props);
  const second_converter = createConverterOfType(second_converter_props);

  first_converter_props.children = map(second_converter);
  second_converter_props.parent = first_converter;

  this.converter = first_converter;
}
function converting_COMPLEX_object() {
  const first = {
    a: 'cat',
    path: '123-abc',
    // children
    extra: 'should be gone',
  };
  const second = {
    b: 'dog',
    // parent,
    extra: 'should be gone',
  };
  const third = {
    b: 'fish',
    // parent
    extra: 'should be gone',
  };
  first.children = [
    second,
    third,
  ];
  second.parent = first;
  third.parent = first;

  this.result = this.converter(first);
}
function COMPLEX_values_are_converted() {
  expect(this.result).toEqual(expect.objectContaining({
    a: 'cat',
    children: expect.arrayContaining([
      expect.objectContaining({
        b: 'dog',
      }),
      expect.objectContaining({
        b: 'dog',
      }),
    ]),
  }));
  expect(this.result.extra).toBeUndefined();
  expect(this.result.children[0].extra).toBeUndefined();
  expect(this.result.children[1].extra).toBeUndefined();
  expect(this.result.children[0].parent).toBe(this.result);
  expect(this.result.children[1].parent).toBe(this.result);
}
