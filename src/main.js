import {createSiteMenuTemplate} from "./components/site-menu.js";
import {createFilterTemplate} from "./components/filter.js";
import {createBoardTemplate} from "./components/board.js";
import {createSortingTemplate} from "./components/sorting.js";
import {createTaskTemplate} from "./components/task.js";
import {createTaskEditElement} from "./components/task-edit.js";
import {createLoadMoreBtnElement} from "./components/load-more-btn.js";

const CARD_COUNT = 3;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate());
render(siteMainElement, createFilterTemplate());
render(siteMainElement, createBoardTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);

render(siteBoardElement, createSortingTemplate(), `afterBegin`);

const siteTaskListElement = siteMainElement.querySelector(`.board__tasks`);

render(siteTaskListElement, createTaskEditElement());

for (let i = 0; i < CARD_COUNT; i++) {
  render(siteTaskListElement, createTaskTemplate());
}

render(siteBoardElement, createLoadMoreBtnElement());
