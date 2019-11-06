var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("default", function () {
    var tsResult = gulp.src("src/*.ts")
        .pipe(ts({
            noImplicitAny: false,
            outDir: "dist",
            module: "commonjs",
            esModuleInterop: true,
            target: "es5",
            moduleResolution: "node",
            sourceMap: true,
        }));
    return tsResult.js.pipe(gulp.dest("dist"));
});