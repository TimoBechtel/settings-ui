const example = [
  {
    id: 'ballCount',
    name: 'Ball count',
    help: 'Input number of balls',
    description: 'Number of balls',
    type: 'number',
    min: 0,
    max: 10,
    steps: 0.5,
    inputType: 'input',
    defaultValue: 2,
    onUpdate(newValue) {
      console.log(newValue);
    },
  },
  {
    id: 'luckyNumber',
    name: 'Lucky number',
    help: 'Choose your lucky number',
    description: '',
    type: 'number',
    defaultValue: 7,
    values: [1, 3, 7, 13],
  },
  {
    id: 'namedNumber',
    name: 'Named number selection',
    help: 'Choose a number',
    description: '',
    type: 'number',
    values: [
      { name: 'one', value: 1 },
      { name: 'three', value: 3 },
    ],
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Advanced settings',
    type: 'section',
    options: [
      {
        id: 'heading',
        name: 'Title',
        type: 'text',
        defaultValue: 'someText',
        min: 0,
        max: 10,
      },
      {
        id: 'speed',
        name: 'Speed',
        type: 'number',
        min: 0.1,
        max: 1,
        steps: 0.1,
      },
    ],
  },
];

export default example;
