import isSameDay from "date-fns/isSameDay";
import isAfter from "date-fns/isAfter";
import {colors} from "./models/colors";

const MS_IN_DAY = 86400000;
const DAYS_IN_WEEK = 7;
const TASK_COUNT = 19;
const MAX_TAGS_COUNT = 3;

const dateNow = Date.now();
const tags = [`homework`, `theory`, `practice`, `intensive`, `keks`];
const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const days = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];

const getTask = () => ({
  description: getRandomDescription(descriptions),
  dueDate: getDueDate(dateNow),
  repeatingDays: getRepeatingDays(days),
  tags: getRandomTags(tags),
  color: getRandomColor(colors),
  isFavorite: getBooleanGivenProbability(0.7),
  isArchive: getBooleanGivenProbability(0.7),
});

export const tasksData = new Array(TASK_COUNT).fill(undefined).map(() => getTask());

export const getFilters = () => [
  {title: `all`, count: tasksData.length, isActive: true},
  {title: `overdue`, count: getOverdueTaskCount(tasksData, dateNow), isActive: false},
  {title: `today`, count: getTodayTaskCount(tasksData, dateNow), isActive: false},
  {title: `favourites`, count: getFavouritesTaskCount(tasksData), isActive: false},
  {title: `repeating`, count: getRepeatingTaskCount(tasksData), isActive: false},
  {title: `tags`, count: getTaggedTaskCount(tasksData), isActive: false},
  {title: `archive`, count: getArchiveTaskCount(tasksData), isActive: false},
];

export function getMenu() {
  return [
    {title: `+ ADD NEW TASK`, id: `new-task`, additionalClassName: `new-task`, isActive: false},
    {title: `TASKS`, id: `task`, additionalClassName: ``, isActive: true},
    {title: `STATISTICS`, id: `statistic`, additionalClassName: ``, isActive: false},
  ];
}

export function getSortToggles() {
  return [
    {title: `SORT BY DEFAULT`, type: `default`, isActive: true},
    {title: `SORT BY DATE up`, type: `date-up`, isActive: false},
    {title: `SORT BY DATE down`, type: `date-down`, isActive: false},
  ];
}

function getRandomDescription(descriptionList) {
  return descriptionList[getRandomInteger(0, descriptionList.length)];
}

function getDueDate(currentDate) {
  return currentDate + 1 + getRandomInteger(-DAYS_IN_WEEK, DAYS_IN_WEEK) * MS_IN_DAY;
}

function getRepeatingDays(dayList) {
  return dayList.reduce((week, day) => {
    week.set(day, getBooleanGivenProbability(0.15));
    return week;
  }, new Map());
}

function getRandomTags(tagList) {
  return new Set(tagList
  .sort(() => Math.random() - 0.5)
  .slice(0, getRandomInteger(0, MAX_TAGS_COUNT + 1)));
}

function getRandomColor(colorList) {
  return colorList[getRandomInteger(0, colorList.length)];
}

function getBooleanGivenProbability(probability) {
  return Math.random() < probability;
}

function getRandomInteger(min = 0, max) {
  return Math.floor(min + Math.random() * (max - min));
}

function getOverdueTaskCount(taskList, currentDate) {
  return taskList.filter((task) => isAfter(currentDate, task.dueDate)).length;
}

function getTodayTaskCount(taskList, currentDate) {
  return taskList.filter((task) => !!isSameDay(task.dueDate, currentDate)).length;
}

function getRepeatingTaskCount(taskList) {
  return taskList.filter((task) => Object.values(task.repeatingDays).some((value) => value)).length;
}

function getFavouritesTaskCount(taskList) {
  return taskList.filter((task) => task.isFavorite).length;
}

function getTaggedTaskCount(taskList) {
  return taskList.filter((task) => task.tags.length).length;
}

function getArchiveTaskCount(taskList) {
  return taskList.filter((task) => task.isArchive).length;
}
