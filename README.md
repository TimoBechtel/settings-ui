[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Settings-UI</h3>

  <p align="center">
    Easily generate web forms from a JSON template with data binding.
    <br />
    <br />
    <a href="https://timobechtel.github.io/settings-ui/">View Demo</a>
    ·
    <a href="https://github.com/TimoBechtel/settings-ui/issues">Report Bug</a>
    ·
    <a href="https://github.com/TimoBechtel/settings-ui/issues">Request Feature</a>
  </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Usage](#usage)
  - [API](#API)
- [Plugins](#Plugins)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## About The Project

This project was created to quickly scaffold a settings UI or similar web form and binding it's data to be used in your JavaScript app.
It generates HTML UI components from a template JSON. You can easily extend it with your own components!

## Getting Started

### Installation

#### NPM:

```sh
npm install settings-ui
```

#### CDN:

```html
<script src="https://unpkg.com/settings-ui/dist/index.umd.js"></script>
```

### CSS

Settings-UI comes with some basic styling. Not required, but you could install it like so:

#### Using a bundler

```javascript
import 'settings-ui/dist/index.css';
```

#### CDN

```html
<link rel="stylesheet" href="https://unpkg.com/settings-ui/dist/index.css" />
```

## Usage

Import it as module:

```javascript
import SettingsUI from 'settings-ui';
```

Then use it like so:

```javascript
// template from which the ui is generated
const template = [
  {
    id: 'number',
    type: 'number',
  },
  {
    id: 'text',
    type: 'text',
  },
  {
    id: 'selection',
    type: 'number',
    values: [1, 2, 3],
  },
];

const ui = SettingsUI();
// create ui and bind to a store object
const store = ui.bind(template);
// render ui
ui.render().to(document.body);
```

### API

#### `bind`: function

Creates the ui from template and bind it's values to a store object. Returns a `store` object.

##### Parameters

| Name     |  Type  |                                                                                         Description |
| -------- | :----: | --------------------------------------------------------------------------------------------------: |
| template | array  |                                                       Your template from which the ui is generated. |
| store    | object | _Optional_ Use a predefined object to store the inputted data. If not set, an empty one is created. |

##### Example

```javascript
const ui = SettingsUI();
const store = {};
ui.bind(template, store);
```

##### `store`: object

Object that stores inputted data. Using the ids from template as keys.

##### Might look like this

```javascript
console.log(store);

/* OUTPUT:
{
  ballCount: 245,
  number: 3,
  section: {
    title: 'someText',
    speed: 23
  },
}
*/

console.log(store.section.speed); // => 23
```

##### `template`: array

Schema, that describes the settings data. Used to generate the UI.

Every object in the array defines one property in the settings store object.

##### Properties

| Name               |   Type   |                                                                                                                                                                                                       Description |
| ------------------ | :------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| id                 |  string  |                                                                                                                                            **Required** Used as property names for the store and for ids in HTML. |
| name               |  string  |                                                                                                                                                                        Short description. Used mainly for labels. |
| help               |  string  |                                                                                                                                                                        Help text. Used for titles or placeholders |
| type               |  string  |                                            Defines value type. Values can be `number`, `text`, `boolean`, `section`. Falls back to default HTML input types. These also define that type of element is generated. |
| description        |  string  |                                                                                                                                                                            Currently not used by core components. |
| name               |  string  |                                                                                                                                                                        Short description. Used mainly for labels. |
| min                |  number  |                                                                                                                                           For number: lowest possible number, for text: minimal character length. |
| max                |  number  |                                                                                                                                              For number: highest possible number, for text: max character length. |
| steps              |  number  |                                                                                                                                                                            Available steps for inputting numbers. |
| inputType          |  string  |                                                                                                                                                          Forces specific elements: `input`, `radio`, `selection`. |
| defaultValue       |  string  |                                                                                                              Value that is used when no value has been set. E.g. when clearing an input field, this value is set. |
| values             |  array   | Defines a set of possible values. Generates a HTML `<select>` or `<input type="radio/>"` element. Each value can be a direct value or an object with a `name` and `value` property. e.g.`{name: 'one', value: 1}` |
| options            |  array   |                                                                                                                                                           For `type = "section"`: Defines subtypes for a section. |
| onUpdate(newValue) | function |                                                                                                                       Function that is called whenever the value changes. Called with the new value as parameter. |

##### Example

Have a look at the [example](https://github.com/TimoBechtel/settings-ui/blob/master/example/example.js) template file.

#### `addChangeListener`: function

Adds a listener that is called every time a value was updated.

##### Parameters

| Name     |   Type   |                                     Description |
| -------- | :------: | ----------------------------------------------: |
| listener | function | Is called with a `id` and `value` as parameter. |

##### Example

```javascript
ui.addChangeListener((key, value) =>
  console.log(`${key} was updated to ${value}`)
);
```

#### `removeChangeListener`: function

Removes a change listener.

##### Parameters

| Name     |   Type   |                      Description |
| -------- | :------: | -------------------------------: |
| listener | function | Listener function to be removed. |

#### `render`: function

Renders the UI. Returns an object for method chaining with following methods:

##### `to`: function

Renders to a specific HTML element.

###### Parameters

| Name    |      Type      |                  Description |
| ------- | :------------: | ---------------------------: |
| element | HTMLDOMElement | Element to render the UI in. |

##### Example

```javascript
ui.render().to(document.getElementById('out'));
```

##### `replace`: function

Similar to `to(element)` but replaces the element with the generated UI.

###### Parameters

| Name    |      Type      |         Description |
| ------- | :------------: | ------------------: |
| element | HTMLDOMElement | Element to replace. |

```javascript
ui.render().replace(document.getElementById('out'));
```

##### `get`: function

Returns the generated element without appending it to the dom.

##### Example

```javascript
ui.render().get();
```

#### `update`: function

Updates HTMLElements with values from store.

##### Parameters

| Name |  Type  |                                                  Description |
| ---- | :----: | -----------------------------------------------------------: |
| id   | string | (optional) If defined, only updates specific element with id |

## Plugins

Currently the Settings UI core can only handle a few basic types like input, selection, radio, checkbox, range and sections. You can however extend it to handle anything you throw at it.

Plugins can be registered when creating the SettingsUI Object:

```javascript
const ui = SettingsUI({
  plugins: [],
});
```

A plugin is a simple function that can use following parameters:

### Parameters

| Name          |   Type   |                             Description |
| ------------- | :------: | --------------------------------------: |
| templateEntry |  object  | A single entry from the template array. |
| update        | function |  A function that updates the form data. |

If the plugin function does not return anything (or `null`), the entry is skipped.

Otherwise you can return an object that can have following properties:

### Returns: Object

with

#### Properties

| Name          |   Type   |                                                                                 Description |
| ------------- | :------: | ------------------------------------------------------------------------------------------: |
| htmlElements  |  array   |                                                          Elements to render on the webpage. |
| onStoreUpdate | function | Function that is called whenever the value in the store is updated. Receives the new value. |

### Example

This is how you could handle a special message type with a clear button:

```javascript
const plugins = [
  ({ id, type, help, defaultValue }, update) => {
    // only handle template entries with type = 'message'
    if (type === 'message') {
      const htmlElements = [];
      const text = document.createElement('textarea');
      text.id = id;
      text.placeholder = help || defaultValue || '';
      if (defaultValue || defaultValue === 0) text.value = defaultValue;

      text.addEventListener('input', e => update(e.target.value));

      const clear = document.createElement('button');
      label.innerHTML = 'Clear';
      label.addEventListener('click', () => {
        text.value = '';
        update('');
      });

      htmlElements.push(label);
      htmlElements.push(text);
      return { htmlElements };
    }
  },
];

// then register the plugin
const ui = SettingsUI({ plugins });
```

## Roadmap

- [x] slider, radio, checkbox components
- [ ] dynamic lists: add function for handling lists with variable length

## Contributing

Contributions are **welcome**!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Commit messages

This project uses semantic-release for automated release versions. So commits in this project follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) guidelines. I recommend using [commitizen](https://github.com/commitizen/cz-cli) for automated commit messages.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/TimoBechtel/settings-ui/blob/master/LICENSE) for more information.

## Contact

Timo Bechtel - [@TimoBechtel](https://twitter.com/TimoBechtel)

Project Link: [https://github.com/TimoBechtel/settings-ui](https://github.com/TimoBechtel/settings-ui)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[forks-shield]: https://img.shields.io/github/forks/TimoBechtel/settings-ui?style=flat-square
[forks-url]: https://github.com/TimoBechtel/settings-ui/network/members
[stars-shield]: https://img.shields.io/github/stars/TimoBechtel/settings-ui?style=flat-square
[stars-url]: https://github.com/TimoBechtel/settings-ui/stargazers
[issues-shield]: https://img.shields.io/github/issues/TimoBechtel/settings-ui?style=flat-square
[issues-url]: https://github.com/TimoBechtel/settings-ui/issues
[license-shield]: https://img.shields.io/github/license/TimoBechtel/settings-ui?style=flat-square
[license-url]: https://github.com/TimoBechtel/settings-ui/blob/master/LICENSE
