const getDeclension = (value: number, titles: string[]): string => {
  const newValue = Math.abs(value) % 100;
  const number = value % 10;

  if (newValue > 10 && newValue < 20) return titles[2];
  if (number > 1 && number < 5) return titles[1];
  if (number === 1) return titles[0];

  return titles[2];
};

export { getDeclension };
