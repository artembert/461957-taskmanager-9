import Task from "./task";
import {colors} from "../models/colors";
import {TagsEdit} from "./tags-edit";

export default class TaskEdit extends Task {
  constructor(...args) {
    super(...args);
    this._tagsEditMarkup = new TagsEdit(Array.from(this._tags)).getTemplate();
  }

  getTemplate() {
    return `<article
    class="card card--${this._color} card--edit ${this._repeatClassName}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text" placeholder="Start typing your text here..." name="text">${this._description}</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">yes</span>
            </button>

            <fieldset class="card__date-deadline">
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder=""
                  name="date"
                  value="23 September 11:15 PM"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">yes</span>
            </button>

            <fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${Array.from(this._repeatingDays.entries()).map(([day, isRepeating]) => `<input
                  class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat"
                  id="repeat-${day}-4" value="${day}"
                  ${isRepeating ? `checked` : ``}/>
                  <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`).join(``) }
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${this._tagsEditMarkup}
            </div>

            <label>
              <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here"/>
            </label>
          </div>
        </div>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
          ${colors.map((color) => `<input
              type="radio"
              id="color-${color}-4"
              class="card__color-input card__color-input--${color} visually-hidden"
              name="color"
              value="${color}"
            />
            <label
              for="color-${color}-4"
              class="card__color card__color--${color}"
            >${color}</label
            >`).join(``)}
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`;
  }
}

