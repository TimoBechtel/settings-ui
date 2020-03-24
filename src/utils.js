export const cast = (value, type) => {
  switch (type) {
    case 'number':
      return parseFloat(value);
    case 'text':
      return value + '';
  }
  return value;
};
