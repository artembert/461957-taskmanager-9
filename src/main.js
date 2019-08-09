import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';

const render = (markup, container, place = `beforeend`) => {
  container.insertAdjacentHTML(place, markup);
};

const renderPage = () => {
  const siteMainElement = document.getElementById(`main`);
  const siteHeaderElement = document.getElementById(`control`);

  render(createSiteMenuTemplate(), siteHeaderElement);
  render(createSearchTemplate(), siteMainElement);
  render(createFilterTemplate(), siteMainElement);
  render(createBoardTemplate(), siteMainElement);

  const boardElement = document.getElementById(`board`);
  const taskListElement = document.getElementById(`board-tasks`);

  render(createLoadMoreButtonTemplate(), boardElement);
  render(createTaskEditTemplate(), taskListElement);
  for (let i = 0; i < 3; i++) {
    render(createTaskTemplate(), taskListElement);
  }
};

renderPage();
