const gulp = require("gulp");
const eslint = require("gulp-eslint");
const stylelint = require("gulp-stylelint");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const runSequence = require("run-sequence");
const browserSync = require("browser-sync").create();

gulp.task("jsLint", () => {
  return gulp.src(["app/**/*.js", "!node_modules/**"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("cssLint", () => {
  return gulp.src("app/**/*.css")
    .pipe(stylelint({
      reporters: [
        {formatter: "string", console: true}
      ]
    }));
});

gulp.task("lint", ["jsLint", "cssLint"]);

gulp.task("clean", () => {
  return del(["build"]);
});

gulp.task("js", () => {
  return gulp.src("app/**/*.js")
    .pipe(babel({"presets": [["env",{"targets": {"browsers":[">1%"]}}]]}))
    .pipe(gulp.dest("build"));
});

gulp.task("css", () => {
  return gulp.src("app/**/*.css")
    .pipe(autoprefixer({browsers: [">1%"]}))
    .pipe(gulp.dest("build"))
    .pipe(browserSync.stream());
});

gulp.task("html", () => {
  return gulp.src("app/**/*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("media", () => {
  return gulp.src("app/**/*.@(png|jpg|jpeg|gif|svg|otf|mp3|wav)")
    .pipe(gulp.dest("build"));
});

gulp.task("build", callback => {
  runSequence("clean", ["js", "css", "html", "media"], callback);
});

gulp.task("html-watch", ["html"], done => {
  browserSync.reload();
  done();
});

gulp.task("js-watch", ["js"], done => {
  browserSync.reload();
  done();
});

gulp.task("default", ["lint", "build"]);

gulp.task("watch", ["build"], () => {

  browserSync.init({
    server: {
      baseDir: "build"
    },
  });

  gulp.watch("app/**/*.html", ["html-watch"]);
  gulp.watch("app/**/*.css", ["css"]);
  gulp.watch("app/**/*.js", ["js-watch"]);
  gulp.watch("app/**/*.@(png|jpg|jpeg|gif|svg|otf|mp3|wav)", ["media"]).on("change", browserSync.reload);
});