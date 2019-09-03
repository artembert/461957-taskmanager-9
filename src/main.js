import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import Board from './components/board';
import LoadMoreButton from './components/load-more-button';
import {getFilters, getMenu, tasksData} from "./data";
import {render, unrender} from "./util/dom";
import BoardController from "./controllers/board-controller";

const TASK_ON_PAGE = 8;

let renderTasksCount = 0;
let boardEl;
let taskListEl;

renderPage();

function renderPage() {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);
  const boardController = new BoardController(siteMainElement, tasksData);

  renderMenu(getMenu(), siteHeaderElement);

  // предусмотрена возможность пробарсывать данные в компонент.
  // За счет одинакового количества и порядка аргументов достигается единообразность функций renderComponent
  renderSearch(undefined, siteMainElement);
  renderFilter((getFilters()), siteMainElement);
  // renderBoard(getSortToggles(), siteMainElement);

  // boardEl = document.querySelector(`.board`);
  // taskListEl = document.querySelector(`.board__tasks`);

  // renderLoadMoreButton(undefined, boardEl);
  boardController.init();
  // tasksData
  // .slice(0, TASK_ON_PAGE)
  // .forEach((task) => {
  //   renderTask(task, taskListEl);
  //   renderTasksCount++;
  // });
}

// TODO: create LoadMore() Fn

function renderFilter(filterData, container) {
  const filter = new Filter(filterData);
  render(filter.getElement(), container);
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
  const board = new Board();
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
