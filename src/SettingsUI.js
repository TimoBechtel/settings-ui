import { cast } from './utils.js';
import coreTypeHandler from './coreTypeHandler.js';
import './main.scss';

const componentUpdater = new Map();

const bindElements = (
  template,
  store,
  htmlElements,
  typeHandler,
  onValueUpdated
) => {
  Object.values(template).forEach(templateComponent => {
    const { id, type, defaultValue, options, onUpdate } = templateComponent;
    for (const handle of typeHandler) {
      const wrapper = handle(templateComponent, newValue => {
        newValue = cast(newValue, type);
        if (newValue !== 0 && newValue !== false && !newValue) {
          newValue = defaultValue || null;
        }

        if (typeof onUpdate === 'function') {
          const v = onUpdate(newValue, store[id]);
          store[id] = v !== undefined ? v : newValue;
        } else store[id] = newValue;
        onValueUpdated(id, newValue);
      });

      if (wrapper) {
        if (options) {
          htmlElements.push(...(wrapper.htmlElements || []));
          store[id] = {};
          bindElements(
            options,
            store[id],
            htmlElements,
            typeHandler,
            onValueUpdated
          );
          return;
        }

        if (typeof wrapper.onStoreUpdate === 'function') {
          componentUpdater.set(id, wrapper.onStoreUpdate);
        }

        store[id] = defaultValue || null;

        htmlElements.push(...(wrapper.htmlElements || []));
        break;
      }
    }
  });
};

const SettingsUI = ({ plugins = [] } = {}) => {
  const changeListener = [];
  const htmlElements = [];
  let _store = null;
  return {
    bind(template, store = {}) {
      bindElements(
        template,
        store,
        htmlElements,
        [...plugins, ...coreTypeHandler],
        (id, newValue) => changeListener.forEach(l => l(id, newValue))
      );
      _store = store;
      return store;
    },
    addChangeListener(listener) {
      changeListener.push(listener);
    },
    removeChangeListener(listener) {
      changeListener.splice(changeListener.indexOf(listener));
    },
    render(tag = 'div') {
      const wrapper = document.createElement(tag);
      wrapper.className = 'settings-ui-wrapper';
      htmlElements.forEach(e => wrapper.appendChild(e));
      return {
        to(element) {
          element.appendChild(wrapper);
          return wrapper;
        },
        replace(element) {
          element.parentElement.replaceChild(wrapper, element);
          return wrapper;
        },
        get() {
          return wrapper;
        },
      };
    },
    update(id) {
      if (id) {
        componentUpdater.get(id)(_store[id]);
        changeListener.forEach(l => l(id, _store[id]));
      } else {
        const updatePartial = object => {
          Object.entries(object).forEach(([key, value]) => {
            if (value && typeof value === 'object') {
              updatePartial(value);
              return;
            }
            componentUpdater.get(key)(value);
            changeListener.forEach(l => l(key, value));
          });
        };
        updatePartial(_store);
      }
    },
  };
};

export default SettingsUI;
