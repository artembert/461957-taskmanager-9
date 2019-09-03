import {BaseComponent} from "./base-component";

export default class Sort extends BaseComponent {
  constructor(sortToggles) {
    super();
    this._sortTogglers = sortToggles;
  }

  getTemplate() {
    return `<div class="board__filter-list">
      ${this._sortTogglers.map((item) => `<a href="#" class="board__filter"
        data-sort-type="${item.type}">${item.title}</a>`).join(``)}
    </div>`;
  }
}
