import {
  drop,
  every,
  first,
  size,
} from 'lodash/fp';

export default class Transaction {
  constructor() {
    this.log = [];
    this.mutations = [];
  }

  async get(ref) {
    if (!every({ op: 'get' }, this.log)) {
      throw new Error('Cannot call get in a transaction after set or update');
    }
    this.log.push({
      op: 'get', path: ref.path,
    });
    return ref.get();
  }

  set(ref, data, opts) {
    this.log.push({
      op: 'set', path: ref.path, data, opts,
    });
    this.mutations.push(async () => ref.set(data, opts));

    return this;
  }

  update(ref, data) {
    this.log.push({
      op: 'update', path: ref.path, data,
    });
    this.mutations.push(async () => ref.update(data));

    return this;
  }

  async commit() {
    const commitNext = (promise, remaining) => promise && promise().then(() => {
      if (size(remaining)) {
        return commitNext(first(remaining), drop(1, remaining));
      }

      return Promise.resolve();
    });

    return commitNext(first(this.mutations), drop(1, this.mutations));
  }
}
