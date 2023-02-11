import gulp from "gulp";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

import { path } from "../config/path.js";

export const fromOtfToTtf = () => {
    return gulp
        .src(`${path.src.fonts}*.otf`)
        .pipe(
            plumber(
                notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ["ttf"],
            })
        )
        .pipe(gulp.dest(path.src.fonts));
};

export const fromTtfToWoff = () => {
    return gulp
        .src(`${path.src.fonts}*.ttf`)
        .pipe(
            plumber(
                notify.onError({
                    title: "FONTS",
                    message: "Error: <%= error.message %>",
                })
            )
        )
        .pipe(
            fonter({
                formats: ["woff"],
            })
        )
        .pipe(gulp.dest(path.build.fonts))
        .pipe(gulp.src(`${path.src.fonts}*.ttf`))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts));
};

export const fontsStyle = () => {
    // функция-затычка
    const cb = () => {};

    const fontsFile = `${path.srcFolder}/scss/fonts.scss`;

    fs.readdir(path.build.fonts, (err, fontsFiles) => {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "", cb);

                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    const fontFileName = fontsFiles[i].split(".")[0];

                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0]
                            ? fontFileName.split("-")[0]
                            : fontFileName;
                        let fontWeight = fontFileName.split("-")[1]
                            ? fontFileName.split("-")[1]
                            : fontFileName;

                        switch (fontWeight.toLowerCase()) {
                            case "thin":
                                fontWeight = 100;
                                break;
                            case "extralight":
                                fontWeight = 200;
                                break;
                            case "light":
                                fontWeight = 300;
                                break;
                            case "medium":
                                fontWeight = 500;
                                break;
                            case "semibold":
                                fontWeight = 600;
                                break;
                            case "bold":
                                fontWeight = 700;
                                break;
                            case "extrabold":
                            case "heavy":
                                fontWeight = 800;
                                break;
                            case "black":
                                fontWeight = 800;
                                break;
                            default:
                                fontWeight = 400;
                        }

                        fs.appendFile(
                            fontsFile,
                            `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff") format("woff"), url("../fonts/${fontFileName}.woff2") format("woff2");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;}\r\n`,
                            cb
                        );

                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log(
                    "Файл scss/fonts.scss уже существует. Для обновления нужно его удалить"
                );
            }
        }
    });

    return gulp.src(path.srcFolder);
};
