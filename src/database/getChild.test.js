/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';

import getOrCreateChild, { getChild } from './getChild';

describe('get child', () => {
  describe('get or create child', () => {
    test('existing document get existing child', {
      given: {
        child_name,
        existing_document_with_child,
        mock_document_creator,
      },
      when: {
        get_or_create_child,
      },
      then: {
        does_NOT_create_new_child,
        result_is_existing_child,
      },
    });

    test('existing document get non-existing child', {
      given: {
        child_name,
        existing_document_WITHOUT_child,
        mock_document_creator,
      },
      when: {
        get_or_create_child,
      },
      then: {
        creates_NEW_CHILD,
        created_child_PARENT_is_DOCUMENT,
      },
    });

    test('non-existing document', {
      given: {
        non_existing_document,
        mock_document_creator,
      },
      when: {
        get_or_create_child,
      },
      then: {
        creates_NEW_CHILD,
        created_child_existence_is_PASSED_VALUE,
        created_child_PARENT_is_DOCUMENT,
      },
    });

    test('document missing children', {
      given: {
        document_WITHOUT_CHILDREN_OBJECT,
        mock_document_creator,
      },
      when: {
        get_or_create_child,
      },
      then: {
        creates_NEW_CHILD,
        created_child_PARENT_is_DOCUMENT,
      },
    });

    test('created child isCollection is opposite parent', {
      given: {
        existing_document_WITHOUT_child,
        mock_document_creator,
      },
      when: {
        get_or_create_child,
      },
      then: {
        created_child_isCollection_is_OPPOSITE_of_DOCUMENT,
      },
    });
  });

  describe('get child', () => {
    test('exists param is false', {
      given: {
        existing_document_WITHOUT_child,
        mock_document_creator,
      },
      when: {
        get_child,
      },
      then: {
        created_child_existence_is_FALSE,
      },
    });
  });
});

function child_name() {
  this.child_name = '123-abc';
}
function existing_document_with_child() {
  this.existing_child = { cat: 'meow' };
  this.document = {
    __exists: true,
    isCollection: true,
    children: {
      [this.child_name]: this.existing_child,
    },
  };
}

function existing_document_WITHOUT_child() {
  this.document = {
    __exists: true,
    isCollection: true,
    children: {},
  };
}

function non_existing_document() {
  this.document = {
    __exists: false,
    isCollection: true,
    children: {},
  };
}

function mock_document_creator() {
  this.was_created = false;
  this.mock_document_creator = jest.fn((name, parent, args) => {
    this.was_created = true;
    this.created_child = {
      name,
      parent,
      args,
    };
  });
}

function document_WITHOUT_CHILDREN_OBJECT() {
  this.document = {
    __exists: true,
  };
}

function get_or_create_child() {
  this.result_child = getOrCreateChild(
    this.document,
    this.mock_document_creator,
    { exists: 'exists_value' },
    this.child_name,
  );
}
function get_child() {
  this.result_child = getChild(
    this.document,
    this.mock_document_creator,
  )(this.child_name);
}

function does_NOT_create_new_child() {
  expect(this.was_created).toBe(false);
}
function result_is_existing_child() {
  expect(this.result_child).toBe(this.existing_child);
}
function creates_NEW_CHILD() {
  expect(this.was_created).toBe(true);
}

function created_child_existence_is_PASSED_VALUE() {
  expect(this.created_child).not.toBeUndefined();
  expect(this.created_child.args).not.toBeUndefined();
  expect(this.created_child.args.exists).toBe('exists_value');
}
function created_child_existence_is_FALSE() {
  expect(this.created_child).not.toBeUndefined();
  expect(this.created_child.args).not.toBeUndefined();
  expect(this.created_child.args.exists).toBe(false);
}
function created_child_PARENT_is_DOCUMENT() {
  expect(this.created_child).not.toBeUndefined();
  expect(this.created_child.parent).toBe(this.document);
}
function created_child_isCollection_is_OPPOSITE_of_DOCUMENT() {
  expect(this.created_child).not.toBeUndefined();
  expect(this.created_child.args).not.toBeUndefined();
  expect(this.created_child.args.isCollection).toBe(!this.document.isCollection);
}
