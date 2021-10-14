const pricePrettify = (price: number): string => {
  const regularExpressionForDivideNumber = /(\d)(?=(\d\d\d)+([^\d]|$))/g;

  return `${price
    .toString()
    .replace(regularExpressionForDivideNumber, '$1 ')}₽`;
};

export { pricePrettify };
