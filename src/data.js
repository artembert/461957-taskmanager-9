const MS_IN_DAY = 24 * 60 * 60 * 1000;

export const getTask = () => ({
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
    .slice(0, Math.floor(Math.random() * 3 + 1))),
  color: [`black`, `yellow`, `blue`, `green`, `pink`][Math.floor(Math.random() * 5)],
  isFavorite: Math.random() > 0.7,
  isArchive: Math.random() > 0.7
});
