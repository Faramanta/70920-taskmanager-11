const generateFilters = (tasks) => {
  return [{
    title: `all`,
    count: tasks.length,
  }, {
    title: `overdue`,
    count: 18,
  }, {
    title: `today`,
    count: 18,
  }, {
    title: `favorites`,
    count: 0,
  }, {
    title: `repeating`,
    count: 18,
  }, {
    title: `archive`,
    count: 18,
  }];
};

// const countItems = (tasks, typeFilter) => {
//   let o = 0;
//
//   tasks.forEach((task) => {
//     task.typeFilter ? o++ : ``;
//     return o;
//   });
// };

export {generateFilters};