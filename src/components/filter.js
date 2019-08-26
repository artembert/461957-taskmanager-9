export const createFilterTemplate = (filters) => {
  const filtersMarkup = filters.map((filter) => `<input
    type="radio"
    id="filter__${filter.title}"
    class="filter__input visually-hidden"
    name="filter"
    checked
  />
  <label for="filter__${filter.title}" class="filter__label">
    ${filter.title} <span class="filter__${filter.title}-count">${filter.count}</span>
    </label>`
  ).join(``);
  return `<section class="main__filter filter container">${filtersMarkup}</section>`;
};
