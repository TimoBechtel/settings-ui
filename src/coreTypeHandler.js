import { section, selection, input } from './coreComponents.js';

export default [
  (value, update) => {
    if (value.type === 'section') {
      return section(value, update);
    }
  },
  (value, update) => {
    if (value.values) {
      return selection(value, update);
    }
  },
  (value, update) => {
    return input(value, update);
  },
];
