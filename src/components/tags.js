import {BaseComponent} from "./base-component";

export class Tags extends BaseComponent {
  constructor(tagList) {
    super();
    this._tagList = tagList;
  }

  getTemplate() {
    return this._tagList.map((tag) => `<span class="card__hashtag-inner">
        <span class="card__hashtag-name">#${tag}</span>
      </span>`).join(``);
  }
}

