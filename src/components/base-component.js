import {createElement} from "../util/dom";

export class BaseComponent {
  constructor() {
    if (new.target === BaseComponent) {
      throw new Error(`Can't instantiate BaseComponent, only inherit from it.`);
    }
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate().trim());
    }
    return this._element;
  }

  getTemplate() {
    throw new Error(`Abstract method is not implemented`);
  }
}
