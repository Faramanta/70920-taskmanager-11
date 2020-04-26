import {filterOverdue, filterByFieldName, filterToday, filterRepeat} from "../utils/common.js";

const generateFilters = (tasks) => {
  const currentDate = new Date().valueOf();

  return [{
    title: `all`,
    count: tasks.length,
  }, {
    title: `overdue`,
    count: filterOverdue(tasks, currentDate).length,
  }, {
    title: `today`,
    count: filterToday(tasks, currentDate).length,
  }, {
    title: `favorites`,
    count: filterByFieldName(tasks, `isFavorite`).length,
  }, {
    title: `repeating`,
    count: filterRepeat(tasks).length,
  }, {
    title: `archive`,
    count: filterByFieldName(tasks, `isArchive`).length,
  }];
};

export {generateFilters};
