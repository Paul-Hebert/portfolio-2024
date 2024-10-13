import CleanCSS from "clean-css";
import { articleCoverUrl } from "./src/_helpers/article-cover-url.js";
import {
  filterByFeatured,
  filterByNotFeatured,
} from "./src/_helpers/filter-by-featured.js";
import { formatDate } from "./src/_helpers/format-data.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("articleCoverUrl", articleCoverUrl);
  eleventyConfig.addFilter("filterByFeatured", filterByFeatured);
  eleventyConfig.addFilter("filterByNotFeatured", filterByNotFeatured);
  eleventyConfig.addFilter("formatDate", formatDate);

  eleventyConfig.addWatchTarget("./src/_assets/**/*");

  eleventyConfig.addCollection("writing", function (collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addCollection("projects", function (collection) {
    return collection.getFilteredByGlob("src/work/projects/*/*.md");
  });

  eleventyConfig.addCollection("openSource", function (collection) {
    return collection.getFilteredByGlob("src/work/open-source/*/*.md");
  });

  eleventyConfig.addPassthroughCopy("./src/**/*.{png,svg,jpeg,jpg,gif}");

  // Allow custom JS in articles
  eleventyConfig.addPassthroughCopy("src/writing/**/*.js");

  return {
    dir: {
      input: "src",
    },
  };
}
