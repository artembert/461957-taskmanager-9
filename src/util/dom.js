import {Position} from "../models/position";

export function render(markup, container, place = Position.BEFOREEND) {
  switch (place) {
    case Position.BEFOREEND:
      container.append(markup);
      break;
    case Position.AFTERBEGIN:
      container.prepend(markup);
      break;
  }
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
