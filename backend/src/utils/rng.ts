export function randomGuildId(): string {
  return Math.round(Math.random() * 100000)
    .toString()
    .padStart(6, "0");
}
