import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import {createFilterTemplate} from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import {Task} from './components/task';
import {createTaskEditTemplate} from './components/task-edit';
import {colors, getFilters, tasksData} from "./data";
import {render} from "./util/dom";

const TASK_ON_PAGE = 8;

let renderTasksCount;

function renderPage() {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  render(createSiteMenuTemplate(), siteHeaderElement);
  render(createSearchTemplate(), siteMainElement);
  render(createFilterTemplate(getFilters()), siteMainElement);
  render(createBoardTemplate(), siteMainElement);

  const boardElement = document.querySelector(`.board`);
  const taskListElement = document.querySelector(`.board__tasks`);

  render(createLoadMoreButtonTemplate(), boardElement);
  render(createTaskEditTemplate(tasksData[0], colors), taskListElement);
  tasksData
    .slice(1, TASK_ON_PAGE)
    .forEach((task) => {
      renderTask(task, taskListElement);
      renderTasksCount++;
    });

  const loadMoreButton = document.querySelector(`.load-more`);
  loadMoreButton.addEventListener(`click`, onLoadMoreTasks);

  function onLoadMoreTasks() {
    // tasksData
    //   .slice(renderTasksCount, renderTasksCount + TASK_ON_PAGE)
    //   .forEach((task) => render(createTaskTemplate(task), taskListElement));
    // renderTasksCount += TASK_ON_PAGE;
    // if (renderTasksCount > tasksData.length) {
    //   loadMoreButton.remove();
    // }
  }
}

function renderTask(taskData, container) {
  const task = new Task(taskData);
  render(task.getTemplate(), container);
}

renderPage();
