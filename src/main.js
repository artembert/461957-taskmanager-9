import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import LoadMoreButton from './components/load-more-button';
import TaskEdit from './components/task-edit';
import {getFilters, getMenu, getSortToggles, tasksData} from "./data";
import {render, unrender} from "./util/dom";
import Task from "./components/task";

const TASK_ON_PAGE = 8;

let renderTasksCount = 0;
let boardEl;
let taskListEl;

renderPage();

function renderPage() {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  renderMenu(getMenu(), siteHeaderElement);

  // предусмотрена возможность пробарсывать данные в компонент.
  // За счет одинакового количества и порядка аргументов достигается единообразность функций renderComponent
  renderSearch(undefined, siteMainElement);
  renderFilter((getFilters()), siteMainElement);
  renderBoard(getSortToggles(), siteMainElement);

  boardEl = document.querySelector(`.board`);
  taskListEl = document.querySelector(`.board__tasks`);

  renderLoadMoreButton(undefined, boardEl);

  tasksData
  .slice(0, TASK_ON_PAGE)
  .forEach((task) => {
    renderTask(task, taskListEl);
    renderTasksCount++;
  });
}

function renderFilter(filterData, container) {
  const filter = new Filter(filterData);
  render(filter.getElement(), container);
}

function renderTask(taskData, container) {
  const task = new Task(taskData);
  const taskEdit = new TaskEdit(taskData);

  task.getElement()
  .querySelector(`.card__btn--edit`)
  .addEventListener(`click`, () => {
    container.replaceChild(taskEdit.getElement(), task.getElement());
    document.addEventListener(`keydown`, onKeyDown);
  });

  taskEdit.getElement()
  .querySelector(`textarea`)
  .addEventListener(`focus`, () => {
    document.removeEventListener(`keydown`, onKeyDown);
  });

  taskEdit.getElement()
  .querySelector(`textarea`)
  .addEventListener(`blur`, () => {
    document.addEventListener(`keydown`, onKeyDown);
  });

  taskEdit.getElement()
  .querySelector(`.card__save`)
  .addEventListener(`click`, onSaveCard);

  render(task.getElement(), container);

  function onKeyDown(evt) {
    if (evt.code === `Esc` || evt.code === `Escape`) {
      container.replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onKeyDown);
    }
  }

  function onSaveCard() {
    container.replaceChild(task.getElement(), taskEdit.getElement());
    document.removeEventListener(`keydown`, onKeyDown);
  }
}

function renderTaskEdit(taskData, container) {
  const taskEdit = new TaskEdit(taskData);
  render(taskEdit.getElement(), container);
}

function renderSearch(searchData, container) {
  const search = new Search(searchData);
  render(search.getElement(), container);
}

function renderMenu(menuData, container) {
  const menu = new Menu(menuData);
  render(menu.getElement(), container);
}

function renderBoard(sortToggles, container) {
  const board = new Board(sortToggles);
  render(board.getElement(), container);
}

function renderLoadMoreButton(data, container) {
  const button = new LoadMoreButton(data);
  render(button.getElement(), container);
  button.getElement().addEventListener(`click`, () => {
    tasksData
    .slice(renderTasksCount, renderTasksCount + TASK_ON_PAGE)
    .forEach((task) => renderTask(task, taskListEl));
    renderTasksCount += TASK_ON_PAGE;
    if (renderTasksCount > tasksData.length) {
      unrender(button.getElement());
    }
  });
  return button;
}
