import {
  convertToCollectionRef,
  convertToDocumentRef,
} from '../../converters';

const get = (mockDocument) => () => (mockDocument.isCollection
  ? convertToCollectionRef(mockDocument)
  : convertToDocumentRef(mockDocument));

export default (mockDocument) => ({
  get: get(mockDocument),
});
