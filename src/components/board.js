import {BaseComponent} from "./base-component";

export default class Board extends BaseComponent {
  constructor(sortToggles) {
    super();
    this._sortTogglers = sortToggles;
  }

  getTemplate() {
    return `<section class="board container">
    <div class="board__filter-list">
      ${this._sortTogglers.map((item) => `<a href="#" class="board__filter"
        data-sort-type="${item.type}">${item.title}</a>`.trim()).join(``)}
    </div> 
    <div class="board__tasks"></div>
    </section>`.trim();
  }
}
