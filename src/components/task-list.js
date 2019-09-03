import {BaseComponent} from "./base-component";

export default class TaskList extends BaseComponent {
  getTemplate() {
    return `<div class="board__tasks"></div>`;
  }
}
