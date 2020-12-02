import assign from 'lodash/assign';
import createMockFirestoreDocument from './createMockFirestoreDocument';
import Transaction from './transaction';

const createMockDb = () => {
  const mockDb = createMockFirestoreDocument('', null, { exists: true });

  assign(mockDb, {
    runTransaction: async (func) => {
      mockDb.transaction = new Transaction();

      await func(mockDb.transaction);
      await mockDb.transaction.commit();
    },
    reset: () => {
      mockDb.children = {};
      mockDb.transaction = null;
    },
  });

  mockDb.database = mockDb;
  mockDb.reset();

  return mockDb;
};
export default createMockDb;
