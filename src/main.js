import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {createTaskTemplate} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {getFilters, tasksData} from "./data";
import {render} from "./util/dom";

const TASK_ON_PAGE = 8;
let renderTasksCount;

const renderPage = () => {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  render(createSiteMenuTemplate(), siteHeaderElement);
  render(createSearchTemplate(), siteMainElement);
  render(createFilterTemplate(getFilters()), siteMainElement);
  render(createBoardTemplate(), siteMainElement);

  const boardElement = document.querySelector(`.board`);
  const taskListElement = document.querySelector(`.board__tasks`);

  render(createLoadMoreButtonTemplate(), boardElement);
  render(createTaskEditTemplate(tasksData[0]), taskListElement);
  tasksData
    .slice(1, TASK_ON_PAGE)
    .forEach((task) => render(createTaskTemplate(task), taskListElement));
  renderTasksCount = TASK_ON_PAGE;

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, onLoadMoreTasks);

  function onLoadMoreTasks() {
    tasksData
      .slice(renderTasksCount, renderTasksCount + TASK_ON_PAGE)
      .forEach((task) => render(createTaskTemplate(task), taskListElement));
    renderTasksCount += TASK_ON_PAGE;
    if (renderTasksCount > tasksData.length) {
      loadMoreButton.remove();
    }
  }
};

renderPage();
