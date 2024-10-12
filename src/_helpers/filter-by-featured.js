export function filterByFeatured(array) {
  return array.filter((item) => item.data.featured);
}

export function filterByNotFeatured(array) {
  return array.filter((item) => !item.data.featured);
}
