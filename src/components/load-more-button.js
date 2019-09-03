import {BaseComponent} from "./base-component";

export default class LoadMoreButton extends BaseComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}
