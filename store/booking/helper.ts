const hash = (userId: string): string => {
  const result = userId + String(new Date().getTime());
  return String(
    Math.abs(
      result.split('').reduce((acc, element) => {
        // eslint-disable-next-line no-param-reassign,no-bitwise
        acc = (acc << 5) - acc + element.charCodeAt(0);
        // eslint-disable-next-line no-bitwise
        return acc & acc;
      }, 0),
    ),
  );
};
export { hash };
