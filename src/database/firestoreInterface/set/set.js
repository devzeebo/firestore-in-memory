import firestoreMerge from './_firestoreMerge';

const set = (fsDocument) => async (data, opts = { merge: false }) => {
  fsDocument.database.setDocument(fsDocument.path, opts.merge
    ? firestoreMerge(fsDocument.documentData, data)
    : data);

  return Promise.resolve();
};
export default set;
