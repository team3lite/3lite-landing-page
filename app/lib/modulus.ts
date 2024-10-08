export const getMod = (number: number, mode: number) => {
  return ((number % mode) + mode) % mode;
};
