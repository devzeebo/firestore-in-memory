import { every } from 'lodash/fp';
import assign from 'lodash/assign';
import createMockFirestoreDocument from './createMockFirestoreDocument';

const createMockDb = () => {
  const mockDb = createMockFirestoreDocument('', null, { exists: true });

  assign(mockDb, {
    runTransaction: async (func) => func(mockDb.transaction),
    reset: () => {
      mockDb.children = {};
      mockDb.transaction = {
        log: [],
        async get(ref) {
          if (!every({ op: 'get' })(mockDb.transaction.log)) {
            throw new Error('Cannot call get in a transaction after set or update');
          }
          mockDb.transaction.log.push({
            op: 'get', path: ref.path,
          });
          return ref.get();
        },
        async set(ref, data, opts) {
          mockDb.transaction.log.push({
            op: 'set', path: ref.path, data, opts,
          });
          return ref.set(data, opts);
        },
        async update(ref, data) {
          mockDb.transaction.log.push({
            op: 'update', path: ref.path, data,
          });
          return ref.update(data);
        },
      };
    },
  });

  mockDb.database = mockDb;
  mockDb.reset();

  return mockDb;
};
export default createMockDb;
