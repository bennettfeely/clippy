var gulp = require("gulp");
var git = require("gulp-git");

gulp.task("clone", function () {
  git.clone("https://github.com/stevelacy/gulp-git", function (err) {
    if (err) throw err;
  });
});
