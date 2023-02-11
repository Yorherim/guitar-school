import gulp from "gulp";

import { path } from "./gulp/config/path.js";
import {
    copy,
    reset,
    html,
    server,
    scss,
    js,
    images,
    fontsStyle,
    fromOtfToTtf,
    fromTtfToWoff,
    svgSprite,
    zip,
    ftp,
} from "./gulp/tasks/index.js";

// наблюдатель
const watcher = () => {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
};

const fonts = gulp.series(fromOtfToTtf, fromTtfToWoff, fontsStyle);

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));

// Сценарии выполнения
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZip = gulp.series(reset, mainTasks, zip);
const deployFTP = gulp.series(reset, mainTasks, ftp);

gulp.task("default", dev);

export { svgSprite, dev, build, deployZip, deployFTP };
