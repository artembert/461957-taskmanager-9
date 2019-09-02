import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import LoadMoreButton from './components/load-more-button';
import TaskEdit from './components/task-edit';
import {getFilters, getMenu, getSortToggles, tasksData} from "./data";
import {render} from "./util/dom";
import Task from "./components/task";

const TASK_ON_PAGE = 8;

// let renderTasksCount;
// let boardEl;
// let taskListEl;
// let loadMoreButton;

renderPage();

function renderPage() {
  let renderTasksCount;
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  renderMenu(getMenu(), siteHeaderElement);

  // предусмотрена возможность пробарсывать данные в компонент.
  // За счет одинакового количества и порядка аргументов достигается единообразность функций renderComponent
  renderSearch(undefined, siteMainElement);
  renderFilter((getFilters()), siteMainElement);
  renderBoard(getSortToggles(), siteMainElement);

  const boardEl = document.querySelector(`.board`);
  const taskListEl = document.querySelector(`.board__tasks`);

  debugger;
  renderLoadMoreButton(undefined, boardEl);
  renderTaskEdit(tasksData[0], taskListEl);
  renderTasksCount++;

  tasksData
    .slice(1, TASK_ON_PAGE)
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
  render(task.getElement(), container);
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
  console.log(button.getElement());
  button.getElement().addEventListener('click', (evt) => {
    console.log("more!")
  });
}

const onLoadMoreTasks = function ({renderTasksCount, }, ) {
  tasksData
    .slice(renderTasksCount, renderTasksCount + TASK_ON_PAGE)
    .forEach((task) => renderTask(task, taskListEl));
  renderTasksCount += TASK_ON_PAGE;
  if (renderTasksCount > tasksData.length) {
    loadMoreButton.remove();
  }
};

