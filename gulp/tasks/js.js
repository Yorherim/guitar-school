import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import browserSync from "browser-sync";
import webpack from "webpack-stream";

import { path } from "../config/path.js";

const productionMode = process.argv.includes("--build");

export const js = () => {
    return gulp
        .src(path.src.js, { sourcemaps: productionMode })
        .pipe(
            plumber(
                notify.onError({
                    title: "JS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            webpack({
                mode: !productionMode ? "development" : "production",
                output: {
                    filename: "app.min.js",
                },
            })
        )
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
};
