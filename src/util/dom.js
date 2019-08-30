import {Position} from "../models/position";

export function render(markup, container, place = Position.BEFOREEND) {
  container.insertAdjacentHTML(place, markup);
}

export function createElement(template) {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
}

export function unrender(element) {
  if (element) {
    element.remove();
  }
}
