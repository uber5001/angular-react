var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['build', 'watchbuild']);

gulp.task('watchbuild', function() {
	gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('build', shell.task([
	'tsc -p src',
	"find Project -name '*.js' -type f -exec sed -i '' -e '$a\\' {} \\;",
]));

gulp.task('copyAngular', shell.task([
	"cp -r angular/modules/angular2/ src/angular2/"
]));

gulp.task('tsdAngular', shell.task([
	"tsd reinstall --config angular/modules/angular2/tsd.json"
]));
