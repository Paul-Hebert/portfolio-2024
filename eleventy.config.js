import CleanCSS from "clean-css";

export default function (eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addWatchTarget("./src/_assets/**/*");

  return {
    dir: {
      input: "src",
    },
  };
}
