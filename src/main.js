import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {tasksData} from "./data";
import {getFilters} from "./data";

const render = (markup, container, place = `beforeend`) => {
  container.insertAdjacentHTML(place, markup);
};

const getByIdFn = (selector) => document.getElementById(selector);

const findElement = (selector, searchFunction = getByIdFn) => {
  const element = searchFunction(selector);
  if (!element) {
    throw new Error(`Element \`${selector}\` did not found`);
  }
  return element;
};

const renderPage = () => {
  const siteMainElement = findElement(`main`);
  const siteHeaderElement = findElement(`control`);

  render(createSiteMenuTemplate(), siteHeaderElement);
  render(createSearchTemplate(), siteMainElement);
  render(createFilterTemplate(getFilters()), siteMainElement);
  render(createBoardTemplate(), siteMainElement);

  const boardElement = findElement(`board`);
  const taskListElement = findElement(`board-tasks`);

  render(createLoadMoreButtonTemplate(), boardElement);
  render(createTaskEditTemplate(), taskListElement);
  tasksData.forEach((task) => render(createTaskTemplate(task), taskListElement));

};

renderPage();
