export const render = (markup, container, place = `beforeend`) => {
  container.insertAdjacentHTML(place, markup);
};

export const getByIdFn = (selector) => document.getElementById(selector);

export const findElement = (selector, searchFunction = getByIdFn) => {
  const element = searchFunction(selector);
  if (!element) {
    throw new Error(`Element \`${selector}\` did not found`);
  }
  return element;
};
