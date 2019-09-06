import BaseComponent from "./base-component";

export default class DaysEdit extends BaseComponent {
  constructor(repeatingDays) {
    super();
    this._repeatingDays = repeatingDays;
  }

  getTemplate() {
    return `${this._repeatingDays.map(([day, isRepeating]) => `<input
      class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat"
      id="repeat-${day}-4" value="${day}"
      ${isRepeating ? `checked` : ``}/>
      <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`).join(``)}`;
  }
}
