const MS_IN_DAY = 86400000;
const DAYS_IN_WEEK = 7;
const TASK_COUNT = 19;

const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`Mo`, `Tu`, `We`, `Th`, `Fr`, `Sa`, `Su`];
export const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const getTask = () => ({
  description: getRandomDescription(descriptions),
  dueDate: getDueDate(),
  repeatingDays: getRepeatingDays(days),
  tags: getRandomTags(tags),
  color: getRandomColor(colors),
  isFavorite: getBooleanGivenProbability(0.7),
  isArchive: getBooleanGivenProbability(0.7),
});

export const tasksData = [];
for (let i = 0; i < TASK_COUNT; i++) {
  tasksData.push(getTask());
}

export const getFilters = () => [
  {title: `all`, count: tasksData.length},
  {title: `overdue`, count: tasksData.filter((task) => task.dueDate < Date.now()).length},
  {
    title: `today`, count: tasksData.filter((task) => {
      const date = new Date();
      const taskDate = new Date(task.dueDate);
      return date.toDateString() === taskDate.toDateString();
    }).length,
  },
  {title: `favourites`, count: tasksData.filter((task) => task.isFavorite).length},
  {
    title: `repeating`, count: tasksData.filter((task) =>
      Object.values(task.repeatingDays).some((value) => value)).length,
  },
  {title: `tags`, count: tasksData.filter((task) => task.tags.length).length},
  {title: `archive`, count: tasksData.filter((task) => task.isArchive).length},
];

function getRandomDescription(descriptionList) {
  return descriptionList[Math.floor(Math.random() * descriptionList.length)];
}

function getDueDate() {
  return Date.now() + 1 + Math.floor(Math.random() * DAYS_IN_WEEK) * MS_IN_DAY;
}

function getRepeatingDays(dayList) {
  return dayList.reduce((week, day) => {
    week[day] = getBooleanGivenProbability(0.15);
    return week;
  }, {});
}

function getRandomTags(tagList) {
  return new Set(tagList
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4)));
}

function getRandomColor(colorList) {
  return colorList[Math.floor(Math.random() * colors.length)];
}

function getBooleanGivenProbability(probability) {
  return Math.random() < probability;
}
