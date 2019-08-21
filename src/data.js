const MS_IN_DAY = 24 * 60 * 60 * 1000;
export const colors = [`black`, `yellow`, `blue`, `green`, `pink`];

const getTask = () => ({
  description:
    [
      `Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`,
    ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * MS_IN_DAY,
  repeatingDays: {
    Mo: Boolean(Math.round(Math.random() < 0.15)),
    Tu: Boolean(Math.round(Math.random() < 0.15)),
    We: Boolean(Math.round(Math.random() < 0.15)),
    Th: Boolean(Math.round(Math.random() < 0.15)),
    Fr: Boolean(Math.round(Math.random() < 0.15)),
    Sa: Boolean(Math.round(Math.random() < 0.15)),
    Su: Boolean(Math.round(Math.random() < 0.15)),
  },
  tags: new Set([`homework`, `theory`, `practice`, `intensive`, `keks`]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 4))),
  color: colors[Math.floor(Math.random() * colors.length)],
  isFavorite: Math.random() > 0.7,
  isArchive: Math.random() > 0.7,
});

export const tasksData = [];
for (let i = 0; i < 19; i++) {
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
