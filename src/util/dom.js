import {Position} from "../models/position";

export function render(markup, container, place) {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(markup);
      break;
    default:
      container.append(markup);
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
