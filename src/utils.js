export const RenderPosition = {
  AFTERBEGIN: `aftebegin`,
  BEFOREEND: `beforeend`
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const filterByFieldName = (tasks, fieldName) => {
  return tasks.filter((task) => task[fieldName]);
};

export const filterToday = (tasks, currentDate) => {
  return tasks.filter((task) => task.dueDate >= currentDate || task.dueDate === null);
};

export const filterOverdue = (tasks, currentDate) => {
  return tasks.filter((task) => task.dueDate < currentDate);
};

export const filterRepeat = (tasks) => {
  return tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean));
};
