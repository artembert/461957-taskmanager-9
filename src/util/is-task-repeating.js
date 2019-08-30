export function isTaskRepeating(repeatingDays) {
  return Array.from(repeatingDays.entries()).some((entries) => entries[1]);
}
