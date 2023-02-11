import browserSync from "browser-sync";
import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import replace from "gulp-replace";
import rename from "gulp-rename";
import cleanCss from "gulp-clean-css";
import webpcss from "gulp-webpcss";
import autoPrefixer from "gulp-autoprefixer";
import groupCssMediaQueries from "gulp-group-css-media-queries";
import gulpIf from "gulp-if";

import { path } from "../config/path.js";

const sass = gulpSass(dartSass);
const productionMode = process.argv.includes("--build");

export const scss = () => {
    return gulp
        .src(path.src.scss, { sourcemaps: !productionMode })
        .pipe(
            plumber(
                notify.onError({
                    title: "SCSS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(replace(/@img\//g, "../img/"))
        .pipe(sass({ outputStyle: "expanded" }))
        .pipe(gulpIf(productionMode, groupCssMediaQueries()))
        .pipe(
            gulpIf(
                productionMode,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp",
                })
            )
        )
        .pipe(
            gulpIf(
                productionMode,
                autoPrefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true,
                })
            )
        )
        .pipe(gulp.dest(path.build.css))
        .pipe(gulpIf(productionMode, cleanCss()))
        .pipe(
            rename({
                extname: ".min.css",
            })
        )
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
};
