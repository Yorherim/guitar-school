import browserSync from "browser-sync";
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import webp from "gulp-webp";
import imageMin from "gulp-imagemin";
import newer from "gulp-newer";
import gulpIf from "gulp-if";

import { path } from "../config/path.js";

const productionMode = process.argv.includes("--build");

export const images = () => {
    return gulp
        .src(path.src.images)
        .pipe(
            plumber(
                notify.onError({
                    title: "IMAGE",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(newer(path.build.images))
        .pipe(gulpIf(productionMode, webp()))
        .pipe(gulpIf(productionMode, gulp.dest(path.build.images)))
        .pipe(gulpIf(productionMode, gulp.src(path.src.images)))
        .pipe(gulpIf(productionMode, newer(path.build.images)))
        .pipe(
            gulpIf(
                productionMode,
                imageMin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interplaced: true,
                    optimizationLevel: 3,
                })
            )
        )
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.svg))
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.stream());
};
