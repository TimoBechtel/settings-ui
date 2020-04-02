import {
  section,
  selection,
  input,
  slider,
  checkbox,
  radio,
} from './coreComponents.js';

export default [
  (value, update) => {
    if (value.inputType === 'input') return input(value, update);
  },
  (value, update) => {
    if (value.type === 'section') {
      return section(value, update);
    }
  },
  (value, update) => {
    if (value.type === 'boolean') return checkbox(value, update);
  },
  (value, update) => {
    if (value.values) {
      if (value.inputType === 'radio') return radio(value, update);
      if (value.inputType === 'selection') return selection(value, update);
      if (value.values.length < 5) return radio(value, update);
      else return selection(value, update);
    }
  },
  (value, update) => {
    if (
      value.type === 'number' &&
      !value.values &&
      typeof value.min === 'number' &&
      typeof value.max === 'number' &&
      (!value.steps || value.steps >= (value.min + value.max) / 1000) // no slider for big values
    )
      return slider(value, update);
  },
  (value, update) => {
    return input(value, update);
  },
];
