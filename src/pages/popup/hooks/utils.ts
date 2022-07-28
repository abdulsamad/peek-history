export const numberIterator = (
  start = -1,
  end = Infinity,
  resetVal = -1
): {
  value: () => number;
  reset: () => void;
  prev: () => { value: number; done: boolean };
  next: () => { value: number; done: boolean };
} => {
  let index = start;

  return {
    value: () => index,
    reset: () => (index = resetVal),
    prev: () =>
      index > 0
        ? { value: --index, done: false }
        : { value: index, done: true },
    next: () =>
      index < end
        ? { value: ++index, done: false }
        : { value: index, done: true },
  };
};
