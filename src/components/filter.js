import BaseComponent from "./base-component";

export default class Filter extends BaseComponent {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return `<section class="main__filter filter container">
      ${this._filters.map((filter) => `<input type="radio" id="filter__${filter.title}"
        class="filter__input visually-hidden" name="filter"
        ${filter.isActive ? `checked` : ``}/>
      <label for="filter__${filter.title}" class="filter__label">
          ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span>
      </label>`).join(``)}
    </section>`;
  }
}
