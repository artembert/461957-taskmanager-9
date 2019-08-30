import Task from "./task";
import {colors} from "../models/colors";

export default class TaskEdit extends Task {
  constructor(...args) {
    super(...args);
  }

  getTemplate() {
    return `<article class="card card--${this._color} card--edit
    ${Object.values(this._repeatingDays).some((value) => value) ? `card--repeat` : ``}">
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
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${this._description}</textarea>
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
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-4"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-4"
                >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-4"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-4"
                >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-4"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-4"
                >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-4"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-4"
                >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-4"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-4"
                >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-4"
                />
                <label class="card__repeat-day" for="repeat-sa-4"
                >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-4"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-4"
                >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
                        <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #repeat
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

              <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #cinema
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>

              <span class="card__hashtag-inner">
                          <input
                            type="hidden"
                            name="hashtag"
                            value="repeat"
                            class="card__hashtag-hidden-input"
                          />
                          <p class="card__hashtag-name">
                            #entertaiment
                          </p>
                          <button type="button" class="card__hashtag-delete">
                            delete
                          </button>
                        </span>
            </div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
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
</article>`.trim();
  }
}

