import Menu from './components/menu';
import Search from './components/search';
import Filter from './components/filter';
import {getFilters, getMenu, tasksData} from "./data";
import {render} from "./util/dom";
import BoardController from "./controllers/board-controller";

const TASKS_ON_PAGE_COUNT = 8;

renderPage();

function renderPage() {
  const siteMainElement = document.querySelector(`main`);
  const siteHeaderElement = document.querySelector(`.main__control`);

  renderMenu(getMenu(), siteHeaderElement);

  // предусмотрена возможность пробарсывать данные в компонент.
  // За счет одинакового количества и порядка аргументов достигается единообразность функций renderComponent
  renderSearch(undefined, siteMainElement);
  renderFilter((getFilters()), siteMainElement);
  renderBoard(tasksData, siteMainElement);
}

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

function renderBoard(tasks, container) {
  const boardController = new BoardController(container, tasks, TASKS_ON_PAGE_COUNT);
  boardController.init();
}
