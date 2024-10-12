export function articleCoverUrl(url, cover) {
  const fileName = cover || "cover.png";
  return url + fileName;
}
