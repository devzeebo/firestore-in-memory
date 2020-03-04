import typesAreEqual from './typesAreEqual';

export default (value) => (dataValue) => typesAreEqual(value, dataValue) && dataValue >= value;
