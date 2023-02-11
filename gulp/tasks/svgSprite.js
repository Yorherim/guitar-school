import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import sprite from "gulp-svg-sprite";

import { path } from "../config/path.js";

export const svgSprite = () => {
    return gulp
        .src(path.src.svgIcons)
        .pipe(
            plumber(
                notify.onError({
                    title: "SVG SPRITE",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            sprite({
                mode: {
                    stack: {
                        sprite: `../icons/icons.svg`,
                        example: true,
                    },
                },
            })
        )
        .pipe(gulp.dest(path.build.images));
};
