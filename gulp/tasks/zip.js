import del from "del";
import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import zipGulp from "gulp-zip";

import { path } from "../config/path.js";

export const zip = () => {
    del(`./${path.rootFolder}.zip`);

    return gulp
        .src(`${path.buildFolder}/**/*.*`)
        .pipe(
            plumber(
                notify.onError({
                    title: "ZIP",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(zipGulp(`${path.rootFolder}.zip`))
        .pipe(gulp.dest("./"));
};
