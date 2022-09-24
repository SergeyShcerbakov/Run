const gulp = require("gulp");
const browserSync = require("browser-sync");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");
const fileInclude = require("gulp-file-include");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "dist",
    },
  });
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
});

gulp.task("fonts", function () {
  return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

gulp.task("icons", function () {
  return gulp.src("src/icons/**/*").pipe(gulp.dest("dist/icons"));
});

gulp.task("js", function () {
  return gulp.src("src/js/**/*.js").pipe(gulp.dest("dist/js"));
});

gulp.task("html", function () {
  return gulp
    .src("src/*.html")
    .pipe(fileInclude())
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(gulp.dest("dist/"));
});

gulp.task("img", function () {
  return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
  gulp.watch("src/scss/**/*.scss", gulp.parallel("styles"));
  gulp.watch("src/fonts/**/*", gulp.parallel("fonts"));
  gulp.watch("src/icons/**/*", gulp.parallel("icons"));
  gulp.watch("src/js/**/*.js", gulp.parallel("js"));
  gulp.watch("src/*.html").on("change", gulp.parallel("html"));
  gulp.watch("src/img/**/*", gulp.parallel("img"));
});

gulp.task(
  "default",
  gulp.parallel(
    "watch",
    "server",
    "styles",
    "fonts",
    "icons",
    "js",
    "html",
    "img"
  )
);
