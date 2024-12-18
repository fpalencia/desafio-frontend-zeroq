export const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const seconds = Math.floor((minutes * 60) % 60);
  const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
};

export const calculateAverageElapsed = (lines: Array<{ elapsed: number }>) => {
  const total = lines.reduce((acc, line) => acc + line.elapsed, 0);
  return Math.round(total / lines.length);
};
