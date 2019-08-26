export function isTaskRepeating(repeatingDays) {
  return Object.values(repeatingDays).some((value) => value);
}
