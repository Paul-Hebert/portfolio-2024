import CleanCSS from "clean-css";
import { sortCollection } from "./src/_helpers/sort-collection.js";
import { articleCoverUrl } from "./src/_helpers/article-cover-url.js";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("sortCollection", sortCollection);
  eleventyConfig.addFilter("articleCoverUrl", articleCoverUrl);

  eleventyConfig.addWatchTarget("./src/_assets/**/*");

  eleventyConfig.addCollection("writing", function (collection) {
    return collection.getFilteredByGlob("src/writing/*/*.md");
  });

  eleventyConfig.addPassthroughCopy("./src/**/*.{png,svg,jpeg,jpg, gif}");

  // Allow custom JS in articles
  eleventyConfig.addPassthroughCopy("src/writing/**/*.js");

  return {
    dir: {
      input: "src",
    },
  };
}
