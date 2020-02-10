import assign from 'lodash/assign';
import createMockFirestoreDocument from './createMockFirestoreDocument';

const createMockDb = () => {
  const mockDb = createMockFirestoreDocument('', null, { exists: true });

  assign(mockDb, {
    setTransactionMock: (mock) => (mockDb.transactionMock = mock),
    runTransaction: async (func) => func(mockDb.transaction),
    reset: () => {
      mockDb.children = {};
      mockDb.transaction = {
        get: async (ref) => ref.get(),
        set: async (ref, data, opts) => ref.set(data, opts),
        update: async (ref, data) => ref.update(data),
      };
    },
  });

  mockDb.database = mockDb;
  mockDb.reset();

  return mockDb;
};
export default createMockDb;
