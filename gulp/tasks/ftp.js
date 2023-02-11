import gulp from "gulp";
import vinylFTP from "vinyl-ftp";
import util from "gulp-util";
import plumber from "gulp-plumber";
import notify from "gulp-notify";

import { configFTP } from "../config/ftp.js";
import { path } from "../config/path.js";

export const ftp = () => {
    configFTP.log = util.log;
    const ftpConnect = vinylFTP.create(configFTP);

    return gulp
        .src(`${path.buildFolder}/**/*.*`)
        .pipe(
            plumber(
                notify.onError({
                    title: "FTP",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(ftpConnect.dest(`/${path.ftp}/${path.rootFolder}`));
};
