import mergeAll from 'lodash/fp/mergeAll';

const set = (fsDocument) => async (data, opts = { merge: false }) => {
  fsDocument.database.setDocument(fsDocument.path, opts.merge
    ? mergeAll([fsDocument.documentData, data])
    : data);

  return Promise.resolve();
};
export default set;
