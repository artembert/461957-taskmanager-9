import BaseComponent from "./base-component";

export default class TagsEdit extends BaseComponent {
  constructor(tagList) {
    super();
    this._tagList = tagList;
  }

  getTemplate() {
    return this._tagList.map((tag) => `<span class="card__hashtag-inner">
      <span class="card__hashtag-inner">
        <input type="hidden" name="hashtag" value="${tag}" class="card__hashtag-hidden-input"/>
        <p class="card__hashtag-name">#${tag}</p>
        <button type="button" class="card__hashtag-delete">delete</button>
      </span>`).join(``);
  }
}
