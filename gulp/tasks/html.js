import gulp from "gulp";
import fileInclude from "gulp-file-include";
import replace from "gulp-replace";
import webpHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import gulpIf from "gulp-if";

import { path } from "../config/path.js";

const productionMode = process.argv.includes("--build");

export const html = () => {
  return gulp
    .src(path.src.html)
    .pipe(
      plumber(
        notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>",
        }),
      ),
    )
    .pipe(fileInclude())
    .pipe(replace(/@img\//g, "img/"))
    .pipe(gulpIf(productionMode, webpHtmlNoSvg()))
    .pipe(
      gulpIf(
        productionMode,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"],
          },
          output: {
            file: "gulp/version.json",
          },
        }),
      ),
    )
    .pipe(gulp.dest(path.build.html))
    .pipe(browserSync.stream());
};
