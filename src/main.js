import {createBoardTemplate} from "./components/board.js";
import {createFilterTemplate} from "./components/filter.js";
import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createTaskEditTemplate} from "./components/task-edit.js";
import {createTaskTemplate} from "./components/task.js";
import {createLoadMoreBtnTemplate} from "./components/load-more-btn.js";
import {generateFilters} from "./mock/filter.js";
import {generateTasks} from "./mock/task.js";

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8; // на старте 8 задач
const SHOWING_TASKS_COUNT_BY_BUTTON = 8; // по каждому клику по кнопке еще +8

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);


const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters(tasks);

console.log(tasks);

// let o = 0;
//
// tasks.forEach((task) => {
//   task.isFavorite ? o++ : ``;
//   console.log(task.isFavorite);
//   return o;
// });
// console.log(o);



render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate(filters));
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);

render(siteBoardElement, createSortingTemplate(), `afterBegin`);

const siteTaskListElement = siteMainElement.querySelector(`.board__tasks`);

render(siteTaskListElement, createTaskEditTemplate(tasks[0]));

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

tasks.slice(1, showingTasksCount)
  .forEach((task) => render(siteTaskListElement, createTaskTemplate(task)));

render(siteBoardElement, createLoadMoreBtnTemplate());

const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  const prevTaskCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTaskCount, showingTasksCount) // с 8 по 16
    .forEach((task) => render(siteTaskListElement, createTaskTemplate(task)));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.remove();
  }
});
