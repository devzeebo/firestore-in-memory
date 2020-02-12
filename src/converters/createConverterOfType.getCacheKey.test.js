/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import { getCacheKey } from './createConverterOfType';

describe('create converter of type', () => {
  describe('cache key', () => {
    test('undefined src cache key', {
      given: {
        UNDEFINED_root_cache_key,
        cacheable_object_WITHOUT_path_prop,
      },
      when: {
        calculating_cache_key_for_FIRST_object,
      },
      then: {
        cache_key_DOES_NOT_include_UNDEFINED,
      },
    });

    test('cacheable object WITHOUT path but SAME shape', {
      given: {
        ROOT_cache_key,
        cacheable_object_WITHOUT_path_prop,
        DIFFERENT_cacheable_object_WITHOUT_path_prop_but_SAME_shape,
      },
      when: {
        calculating_cache_key_for_FIRST_object,
        calculating_cache_key_for_SECOND_object,
      },
      then: {
        cache_keys_MATCH,
      },
    });

    test('cacheable object WITHOUT path and DIFFERENT shape', {
      given: {
        ROOT_cache_key,
        cacheable_object_WITHOUT_path_prop,
        DIFFERENT_cacheable_object_WITHOUT_path_prop_and_DIFFERENT_shape,
      },
      when: {
        calculating_cache_key_for_FIRST_object,
        calculating_cache_key_for_SECOND_object,
      },
      then: {
        cache_keys_DO_NOT_match,
      },
    });


    test('cacheable object with path', {
      given: {
        cacheable_object_WITH_PATH_prop,
        DIFFERENT_cacheable_object_with_SAME_PATH,
      },
      when: {
        calculating_cache_key_for_FIRST_object,
        calculating_cache_key_for_SECOND_object,
      },
      then: {
        cache_keys_MATCH,
      },
    });

    test('nil cacheable object', {
      given: {
        NULL_cacheable_object,
        UNDEFINED_cacheable_object,
      },
      when: {
        calculating_cache_key_for_FIRST_object,
        calculating_cache_key_for_SECOND_object,
      },
      then: {
        cache_keys_MATCH,
      },
    });
  });
});

function ROOT_cache_key() {
  this.src_cache_key = 'src:a:123-abc';
}
function UNDEFINED_root_cache_key() {
  this.src_cache_key = undefined;
}
function cacheable_object_WITHOUT_path_prop() {
  this.first_cacheable_object = {
    cat: 'meow',
  };
}
function cacheable_object_WITH_PATH_prop() {
  this.first_cacheable_object = {
    path: '123-abc/nested/456-def',
    cat: 'meow',
  };
}
function DIFFERENT_cacheable_object_WITHOUT_path_prop_but_SAME_shape() {
  this.second_cacheable_object = {
    cat: 'meow',
  };
}
function DIFFERENT_cacheable_object_WITHOUT_path_prop_and_DIFFERENT_shape() {
  this.second_cacheable_object = {
    dog: 'woof',
  };
}
function DIFFERENT_cacheable_object_with_SAME_PATH() {
  this.second_cacheable_object = {
    path: '123-abc/nested/456-def',
    dog: 'woof',
  };
}
function NULL_cacheable_object() {
  this.first_cacheable_object = null;
}
function UNDEFINED_cacheable_object() {
  this.second_cacheable_object = undefined;
}

function calculating_cache_key_for_FIRST_object() {
  this.first_cache_key = getCacheKey(
    this.ROOT_cache_key,
    this.first_cacheable_object,
  );
}
function calculating_cache_key_for_SECOND_object() {
  this.second_cache_key = getCacheKey(
    this.ROOT_cache_key,
    this.second_cacheable_object,
  );
}

function cache_keys_MATCH() {
  expect(this.first_cache_key).toEqual(this.second_cache_key);
}
function cache_keys_DO_NOT_match() {
  expect(this.first_cache_key).not.toEqual(this.second_cache_key);
}
function cache_key_DOES_NOT_include_UNDEFINED() {
  expect(this.first_cache_key).not.toEqual(expect.stringContaining('undefined'));
}
