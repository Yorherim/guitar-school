import gulp from "gulp";

import { path } from "../config/path.js";

export const copy = () => {
    return gulp.src(path.src.files).pipe(gulp.dest(path.build.files));
};
