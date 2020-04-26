import LoadMoreButtonComponent from "../components/load-more-btn.js";
import TaskEditComponent from "../components/task-edit.js";
import TaskComponent from "../components/task.js";
import TasksComponent from "../components/tasks.js";
import NoTasksComponent from "../components/no-tasks.js";
import SortComponent from "../components/sort.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {SHOWING_TASKS_COUNT_ON_START, SHOWING_TASKS_COUNT_BY_BUTTON, KeyCode, SortType} from "../const.js";


const renderTask = (taskListElement, task) => {
  const replaceTaskToEdit = () => {
    replace(taskEditComponent, taskComponent);
  };

  const replaseEditToTask = () => {
    replace(taskComponent, taskEditComponent);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === KeyCode.ESCAPE || evt.key === KeyCode.ESC;

    if (isEscKey) {
      replaseEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const taskComponent = new TaskComponent(task);
  const taskEditComponent = new TaskEditComponent(task);

  taskComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.setSubmitHandler((evt) => {
    evt.preventDefault();
    replaseEditToTask();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(taskListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderTasks = (taskListElement, tasks) => {
  tasks.forEach((task) => {
    renderTask(taskListElement, task);
  });
};

const getSortedTasks = (tasks, sortType, from, to) => {
  let sortedTasks = [];

  const showingTasks = tasks.slice();

  switch (sortType) {
    case SortType.DATE_UP:
      sortedTasks = showingTasks.sort((a, b) => a.dueDate - b.dueDate);
      break;
    case SortType.DATE_DOWN:
      sortedTasks = showingTasks.sort((a, b) => b.dueDate - a.dueDate);
      break;
    case SortType.DEFAULT:
      sortedTasks = showingTasks;
      break;
  }
  return sortedTasks.slice(from, to);
};

export default class BoardController {
  constructor(container) {
    this._container = container;

    this._noTasksComponent = new NoTasksComponent();
    this._sortComponent = new SortComponent();
    this._tasksComponent = new TasksComponent();
    this._loadMoreButtonComponent = new LoadMoreButtonComponent();
  }

  render(tasks) {
    const renderLoadMoreButton = () => {
      if (showingTasksCount >= tasks.length) {
        return;
      }

      const loadMoreButtonComponent = this._loadMoreButtonComponent;

      render(container, loadMoreButtonComponent, RenderPosition.BEFOREEND);

      loadMoreButtonComponent.setClickHandler(() => {
        const prevTasksCount = showingTasksCount;
        showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

        const sortedTasks = getSortedTasks(tasks, this._sortComponent.getSortType(), prevTasksCount, showingTasksCount);
        renderTasks(taskListElement, sortedTasks);

        if (showingTasksCount >= tasks.length) {
          remove(loadMoreButtonComponent);
        }
      });
    };

    const container = this._container.getElement();
    const isAllTasksArchived = tasks.every((task) => task.isArchive);

    if (isAllTasksArchived) {
      render(container, this._noTasksComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._tasksComponent, RenderPosition.BEFOREEND);

    const taskListElement = this._tasksComponent.getElement();

    let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;

    renderTasks(taskListElement, tasks.slice(0, showingTasksCount));
    renderLoadMoreButton();

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      showingTasksCount = SHOWING_TASKS_COUNT_BY_BUTTON;

      const sortedTasks = getSortedTasks(tasks, sortType, 0, showingTasksCount);

      taskListElement.innerHTML = ``;

      renderTasks(taskListElement, sortedTasks);
      renderLoadMoreButton();
    });
  }
}
