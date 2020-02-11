/* eslint-disable camelcase,prefer-arrow-callback,func-names,no-use-before-define,no-param-reassign */
import test from 'jest-gwt';
import pick from 'lodash/fp/pick';

import docsProp from './docs';

import { convertToDocumentSnap as mock_convertToDocumentSnap } from '../../converters';

jest.mock('../../converters');

describe('firestore interface::docs', () => {
  test('maps docs correctly', {
    given: {
      mock_document,
      mock_doc_snap_converter,
    },
    when: {
      getting_docs,
    },
    then: {
      docs_are_snapshots,
    },
  });
});

function mock_document() {
  this.document = {
    children: {
      c: { animal: 'cat', sound: 'meow' },
      d: { animal: 'dog', sound: 'woof' },
      f: { animal: 'fish', sound: 'blub' },
    },
  };
}
function mock_doc_snap_converter() {
  mock_convertToDocumentSnap
    .mockImplementation(pick(['sound']));
}

function getting_docs() {
  this.result = docsProp(this.document).get();
}

function docs_are_snapshots() {
  expect(this.result).toEqual(expect.arrayContaining([
    { sound: 'meow' },
    { sound: 'woof' },
    { sound: 'blub' },
  ]));
}
