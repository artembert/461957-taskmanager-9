import TaskList from "../components/task-list";
import Board from "../components/board";
import TaskListEmpty from "../components/task-list-empty";
import {render, unrender} from "../util/dom";
import Task from "../components/task";
import TaskEdit from "../components/task-edit";
import {getSortToggles, tasksData} from "../data";
import Sort from "../components/sort";
import LoadMoreButton from "../components/load-more-button";

export default class BoardController {
  constructor(container, tasks, tasksOnScreenCount) {
    this._container = container;
    this._tasks = tasks;
    this._tasksOnScreenCount = tasksOnScreenCount;
    this._board = new Board();
    this._sort = new Sort(getSortToggles());
    this._taskList = new TaskList();
    this._taskListEmpty = new TaskListEmpty();
    this._renderTasksCount = tasksOnScreenCount;
  }

  init() {
    render(this._board.getElement(), this._container);
    if (!this._tasks.length) {
      render(this._taskListEmpty.getElement(), this._board.getElement());
    } else {
      render(this._sort.getElement(), this._board.getElement());
      render(this._taskList.getElement(), this._board.getElement());
      this._tasks
        .slice(0, this._renderTasksCount)
        .forEach((taskData) => this._renderTask(taskData));
      this._renderLoadMoreButton();
    }
  }

  _renderTask(taskData) {
    const task = new Task(taskData);
    const taskEdit = new TaskEdit(taskData);

    const onSaveCard = () => {
      this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
      document.removeEventListener(`keydown`, onKeyDown);
    };

    const onKeyDown = (evt) => {
      if (evt.code === `Esc` || evt.code === `Escape`) {
        this._taskList.getElement().replaceChild(task.getElement(), taskEdit.getElement());
        document.removeEventListener(`keydown`, onKeyDown);
      }
    };

    task.getElement()
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(taskEdit.getElement(), task.getElement());
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

    render(task.getElement(), this._taskList.getElement());
  }


  _renderLoadMoreButton() {
    const button = new LoadMoreButton();
    render(button.getElement(), this._board.getElement());
    button.getElement().addEventListener(`click`, () => {
      this._tasks
        .slice(this._renderTasksCount, this._renderTasksCount + this._tasksOnScreenCount)
        .forEach((taskData) => {
          this._renderTask(taskData);
          this._renderTasksCount++;
        });
      if (this._renderTasksCount >= tasksData.length) {
        unrender(button.getElement());
      }
    });
  }

}
