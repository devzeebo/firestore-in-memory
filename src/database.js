/* eslint-disable max-classes-per-file, no-underscore-dangle */
import merge from 'lodash/fp/merge';
import size from 'lodash/fp/size';
import split from 'lodash/fp/split';
import join from 'lodash/fp/join';
import values from 'lodash/fp/values';
import flow from 'lodash/fp/flow';
import map from 'lodash/fp/map';
import replace from 'lodash/fp/replace';
import {
  convertToCollectionRef,
  convertToDocumentRef,
  convertToQuerySnap,
  convertToDocumentSnap,
} from './converters';

const splitNextDocRef = (ref) => {
  const [refName, ...remainingRef] = split('/')(ref);

  return {
    refName,
    remainingRef: join('/')(remainingRef),
  };
};

class Collection {
  constructor(id, parent, { isCollection, exists } = {}) {
    this.id = id;
    this.parent = parent;

    if (parent) {
      this.path = flow(
        join('/'),
        replace(/^\//, ''),
      )([parent.path, id]);
      this.database = parent.database;
    }

    this.isCollection = isCollection;
    this.__exists = exists;

    this.collections = {};
  }

  getsertCollection(name, args) {
    return this.collections[name] || (this.collections[name] = new Collection(name, this, args));
  }

  setDocument(ref, data) {
    const { refName, remainingRef } = splitNextDocRef(ref);

    const collection = this.getsertCollection(
      refName,
      { isCollection: !this.isCollection, exists: true },
    );

    if (remainingRef) {
      collection.setDocument(remainingRef, data);
    } else {
      collection.documentData = data;
    }
  }

  getDocument(ref) {
    const { refName, remainingRef } = splitNextDocRef(ref);

    const collection = ((this.__exists && this.collections[refName])
      ? this.collections[refName]
      : new Collection(
        refName,
        this,
        { isCollection: false, exists: false },
      ));

    if (remainingRef) {
      return collection.getDocument(remainingRef);
    }

    return collection;
  }

  // firestore interface
  doc = (name) => ((this.__exists && this.collections[name])
    ? convertToDocumentRef(this.collections[name])
    : convertToDocumentRef(new Collection(
      name,
      this,
      { isCollection: false, exists: false },
    )));

  collection = (name) => ((this.__exists && this.collections[name])
    ? convertToCollectionRef(this.collections[name])
    : convertToCollectionRef(new Collection(
      name,
      this,
      { isCollection: true, exists: false },
    )));

  get = async () => {
    const snap = this.isCollection
      ? convertToQuerySnap(this)
      : convertToDocumentSnap(this);

    return Promise.resolve(snap);
  };

  get exists() { return this.__exists; }

  get size() { return size(this.collections); }

  get empty() { return this.size === 0; }

  get docs() {
    return flow(
      values,
      map(convertToDocumentSnap),
    )(this.collections);
  }

  get ref() {
    return this.isCollection
      ? convertToCollectionRef(this)
      : convertToDocumentRef(this);
  }

  set = async (data, opts = { merge: false }) => {
    this.database.setDocument(this.path, opts.merge
      ? merge(this.documentData, data)
      : data);

    return Promise.resolve();
  };

  update = async (data) => {
    this.database.setDocument(this.path, {
      ...this.documentData,
      ...data,
    });

    return Promise.resolve();
  };

  data = () => this.documentData;
}

export default class MockDb extends Collection {
  constructor() {
    super('', null, { exists: true });

    this.database = this;
  }
}
