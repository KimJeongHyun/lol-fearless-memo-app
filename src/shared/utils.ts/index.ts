export const krSort = <T>(array: T[] = [], key?: string) => {
  if (key) {
    return array.sort((a, b) => (a[key] > b[key] ? 1 : -1));
  }

  return array.sort();
};
