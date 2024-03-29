import {isTaskRepeating} from "../util/is-task-repeating";
import {format} from "date-fns";
import {BaseComponent} from "./base-component";
import {Tags} from "./tags";

export default class Task extends BaseComponent {
  constructor({description, dueDate, repeatingDays, tags, color}) {
    super();
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._repeatClassName = isTaskRepeating(this._repeatingDays) ? `card--repeat` : ``;
    this._tagListMarkup = new Tags(Array.from(this._tags)).getTemplate();
  }

  getTemplate() {
    return `<article class="card card--${this._color} ${this._repeatClassName}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button type="button" class="card__btn card__btn--favorites card__btn--disabled">
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${this._description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${format(this._dueDate, `d MMMM`).toUpperCase()}</span>
                <span class="card__time">${format(this._dueDate, `H:mm`)}</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${this._tagListMarkup}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`;
  }
}

