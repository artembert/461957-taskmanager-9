import {createSiteMenuTemplate} from './components/site-menu';
import {createSearchTemplate} from './components/search';
import Filter from './components/filter';
import {createBoardTemplate} from './components/board';
import {createLoadMoreButtonTemplate} from './components/load-more-button';
import TaskEdit from './components/task-edit';
import {getFilters, tasksData} from "./data";
import {render} from "./util/dom";
import Task from "./components/task";

const TASK_ON_PAGE = 8;

let renderTasksCount;

function renderPage() {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  render(createSiteMenuTemplate(), siteHeaderElement);
  render(createSearchTemplate(), siteMainElement);
  renderFilter((getFilters()), siteMainElement);
  render(createBoardTemplate(), siteMainElement);

  const boardElement = document.querySelector(`.board`);
  const taskListElement = document.querySelector(`.board__tasks`);

  render(createLoadMoreButtonTemplate(), boardElement);
  renderTaskEdit(tasksData[0], taskListElement);
  renderTasksCount++;

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

function renderFilter(filterData, container) {
  const filter = new Filter(filterData);
  render(filter.getTemplate(), container);
}

function renderTask(taskData, container) {
  const task = new Task(taskData);
  render(task.getTemplate(), container);
}

function renderTaskEdit(taskData, container) {
  const taskEdit = new TaskEdit(taskData);
  render(taskEdit.getTemplate(), container);
}

renderPage();
