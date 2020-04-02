export const section = ({ id, name }) => {
  const elementCreator = type => document.createElement(type);
  const e = elementCreator('b');
  e.innerHTML = name || id;
  return {
    htmlElements: [e],
    superType: true,
  };
};

export const input = (
  { id, name, type = 'text', help, defaultValue, min, max, steps },
  update
) => {
  const htmlElements = [];
  const elementCreator = type => document.createElement(type);

  const input = elementCreator('input');
  input.type = type;
  input.id = id;
  if (type === 'number') {
    if (typeof min === 'number') input.min = min;
    if (typeof max === 'number') input.max = max;
    if (typeof steps === 'number') input.steps = steps;
  } else {
    if (typeof min === 'number') input.minLength = min;
    if (typeof max === 'number') input.maxLength = max;
  }
  input.placeholder = help || defaultValue || '';
  if (defaultValue || defaultValue === 0) input.value = defaultValue;

  input.addEventListener('input', e => update(e.target.value));

  const label = elementCreator('label');
  label.innerHTML = name || id;
  label.htmlFor = id;

  htmlElements.push(label);
  htmlElements.push(input);
  return { htmlElements };
};

export const selection = ({ id, name, help, values, defaultValue }, update) => {
  const htmlElements = [];
  const elementCreator = type => document.createElement(type);

  const select = elementCreator('select');
  select.id = id;
  select.title = help || '';

  values.forEach(v => {
    const option = elementCreator('option');
    if (typeof v === 'object') {
      option.value = v.value;
      option.innerHTML = v.name;
    } else {
      option.value = option.innerHTML = v;
    }
    select.appendChild(option);
  });

  if (defaultValue || defaultValue === 0) select.value = defaultValue;

  select.addEventListener('input', e => update(e.target.value));

  const label = document.createElement('label');
  label.htmlFor = id;
  label.innerHTML = name || id;

  htmlElements.push(label);
  htmlElements.push(select);

  return { htmlElements };
};
