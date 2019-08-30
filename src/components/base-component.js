import {createElement} from "../util/dom";

export class BaseComponent {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  getTemplate() {
    throw new Error(`Abstract method is not implemented`);
  }
}
