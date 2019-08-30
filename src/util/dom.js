import {Position} from "../models/position";

export function render(markup, container, place = Position.BEFOREEND) {
  container.insertAdjacentHTML(place, markup);
};

export function unrender(element) {
  if (element) {
    element.remove();
  }
}
