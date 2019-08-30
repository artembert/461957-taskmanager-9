import {BaseComponent} from "./base-component";

export default class Menu extends BaseComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return `<section class="control__btn-wrap">
      ${this._items.map((item) => `<input
        type="radio" name="control" id="control__${item.id}" class="control__input visually-hidden"
        ${item.isActive ? `checked` : ``}/>
      <label for="control__${item.id}"
      class="control__label ${item.additionalClassName ? `control__label--${item.additionalClassName}` : ``}"
        >${item.title}</label>`.trim()).join(``)}
    </section>`.trim();
  }
}
