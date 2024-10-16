import CleanCSS from "clean-css";
import { articleCoverUrl } from "./src/_helpers/article-cover-url.js";
import {
  filterByFeatured,
  filterByNotFeatured,
} from "./src/_helpers/filter-by-featured.js";
import { formatDate } from "./src/_helpers/format-data.js";
import Image from "@11ty/eleventy-img";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });
  eleventyConfig.addFilter("articleCoverUrl", articleCoverUrl);
  eleventyConfig.addFilter("filterByFeatured", filterByFeatured);
  eleventyConfig.addFilter("filterByNotFeatured", filterByNotFeatured);
  eleventyConfig.addFilter("formatDate", formatDate);

  eleventyConfig.addShortcode(
    "image",
    async function (
      src,
      alt,
      sizes = "100vh",
      widths = [500, 1000, 1500],
      loading = "lazy",
    ) {
      let metadata = await Image(`./src/${src}`, {
        widths,
        formats: ["avif", "jpeg"],
        // sharpOptions: {
        //   animated: true,
        // },
        // svgShortCircuit: "size",
        outputDir: "./_site/img/",
      });

      return Image.generateHTML(metadata, {
        alt,
        sizes,
        loading: loading,
        decoding: "async",
      });
    },
  );
  // For some reason, the outputDir option for the image plugin wasn't working,
  // so we manually copy them over.
  eleventyConfig.addPassthroughCopy("./img");

  eleventyConfig.addWatchTarget("./src/_assets/**/*");
  eleventyConfig.addPassthroughCopy("./src/_assets/fonts/**/*.woff2");

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
