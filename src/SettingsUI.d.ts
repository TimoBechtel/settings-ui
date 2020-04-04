declare module 'settings-ui';

interface renderResult {
  /**
   * Renders to a specific HTML element.
   * @param element Element to render the UI in.
   */
  to: (element: HTMLElement) => HTMLElement;
  /**
   * Similar to to(element) but replaces the element with the generated UI.
   * @param element Element to render the UI in.
   */
  replace: (element: HTMLElement) => HTMLElement;
  /**
   * Returns the generated element without appending it to the dom.
   * @returns Returns the generated element without appending it to the dom.
   */
  get: () => HTMLElement;
}

interface templateEntry {
  /**
   * Required. Used as property name for the store and for id in HTML.
   */
  id: string;
  /**
   * Help text. Used for titles or placeholders
   */
  help?: string;
  /**
   * Defines value type.
   * Falls back to default HTML input types. These also define what type of element is generated.
   */
  type?: 'number' | 'text' | 'boolean' | 'selection' | string;
  /**
   * Currently not used by core components.
   */
  description?: string;
  /**
   * Short description. Used mainly for labels.
   */
  name?: string;
  /**
   * For number: lowest possible number, for text: minimal character length.
   */
  min?: number;
  /**
   * For number: highest possible number, for text: max character length.
   */
  max?: number;
  /**
   * For number: Available steps for inputting numbers.
   */
  steps?: number;
  /**
   * Forces input element to specific type
   */
  inputType?: 'input' | 'radio' | 'selection';
  /**
   * Value that is used when no value has been set. E.g. when clearing an input field, this value is set.
   */
  defaultValue?: string;

  /**
   * Defines a set of possible values. Generates a HTML <select> or <input type="radio/>" element.
   * Each value can be a direct value or an object with a name and value property.
   * @example [{name: 'one', value: 1}]
   */
  values?: { name: string; value: any }[] | any[];
  /**
   * For type = "section": Defines subtypes for a section.
   */
  options?: any[];
  /**
   * Function that is called whenever the value changes.
   * Called with the new value as parameter.
   * Can be used to change values before storing.
   * @param newValue The new value
   * @returns (optional) The new value to store
   */
  onUpdate?: (newValue?: any) => any;
}

interface settingsUI {
  /**
   * Creates the ui from template and bind it's values to a store object.
   * Returns a store object.
   * @param template A template array
   * @param store An object that stores the form data
   * @returns An object that stores the form data, prefilled
   */
  bind: (template: templateEntry[], store?: object) => object;
  /**
   * Adds a listener that is called every time a value was updated.
   * @param listener Function that is to be called
   */
  addChangeListener: (listener: (id: string, value: any) => void) => void;
  /**
   * Removes a change listener.
   * @param listener Listener to be removed
   */
  removeChangeListener: (listener: (id: string, value: any) => void) => void;
  /**
   * Renders the UI.
   * @param [tag=div] Tag to render as.
   */
  render: (tag?: string) => renderResult;
}

interface pluginResult {
  /**
   * HTML ELements to render
   */
  htmlElements?: HTMLElement[];
  /**
   * Defines, if this template entry has sub entries defined by templateEntry.options
   */
  superType?: boolean;
}

/**
 * @param templateEntry A single entry from the template array.
 * @param update A function that updates the form data.
 */
interface plugin {
  (
    templateEntry?: templateEntry,
    update?: (value: string) => void
  ): pluginResult | void;
}

interface settingsUIArguments {
  plugins?: plugin[];
}

declare function SettingsUI(options?: settingsUIArguments): settingsUI;
export = SettingsUI;
