export function sortCollection(collection) {
  return collection.sort((a, b) => {
    if (a.data.order && b.data.order) {
      return a.data.order - b.data.order;
    }
    if (a.data.order) {
      return -1;
    }
    if (b.data.order) {
      return 1;
    }
    if (a.date && b.date) {
      return b.date - a.date;
    }

    return 0;
  });
}
