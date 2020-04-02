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

export const slider = (
  { id, name, help, defaultValue, min, max, steps },
  update
) => {
  const htmlElements = [];
  const elementCreator = type => document.createElement(type);

  const input = elementCreator('input');
  input.type = 'range';
  input.id = id;
  input.min = min || 0;
  if (max || max === 0) input.max = max;
  if (steps) input.step = steps;

  input.placeholder = help || defaultValue || '';
  if (defaultValue || defaultValue === 0) input.value = defaultValue;

  const label = elementCreator('label');
  label.innerHTML = name || id;
  label.htmlFor = id;

  const output = elementCreator('output');
  output.innerHTML = input.value;

  input.addEventListener('input', e => {
    output.innerHTML = e.target.value;
    update(e.target.value);
  });

  htmlElements.push(label);
  htmlElements.push(input);
  htmlElements.push(output);
  return { htmlElements };
};

export const checkbox = ({ id, name, help, defaultValue }, update) => {
  const htmlElements = [];
  const elementCreator = type => document.createElement(type);

  const input = elementCreator('input');
  input.type = 'checkbox';
  input.id = id;
  input.title = help || '';
  if (typeof defaultValue === 'boolean') input.checked = defaultValue;

  input.addEventListener('input', e => update(e.target.checked));

  const label = elementCreator('label');
  label.innerHTML = name || id;
  label.htmlFor = id;

  htmlElements.push(input);
  htmlElements.push(label);

  return { htmlElements };
};

export const radio = ({ id, values, defaultValue, help }, update) => {
  const htmlElements = [];
  const elementCreator = type => document.createElement(type);

  values.forEach(v => {
    const radio = elementCreator('input');
    radio.type = 'radio';
    radio.name = id;
    radio.title = help || '';

    const label = document.createElement('label');

    if (typeof v === 'object') {
      radio.value = v.value;
      radio.id = `${id}_${v.value}`;
      label.innerHTML = v.name;
    } else {
      radio.value = label.innerHTML = v;
      radio.id = `${id}_${v}`;
    }

    if (defaultValue + '' === radio.value + '') radio.checked = true;

    radio.addEventListener('click', e => update(e.target.value));

    label.htmlFor = radio.id;

    htmlElements.push(radio);
    htmlElements.push(label);
  });

  return { htmlElements };
};
