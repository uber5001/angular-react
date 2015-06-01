var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['build', 'watchbuild']);

gulp.task('watchbuild', function() {
	gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('build', shell.task([
	'tsc -p src',
	'rm -r dist/node_modules/angular2',
	'mv dist/angular2 dist/node_modules/angular2',
	'cp src/angular2package.json dist/node_modules/angular2/package.json',
	"find dist -name '*.js' -type f -exec sed -i '' -e '$a\\' {} \\;",
]));

gulp.task('copyAngular', shell.task([
	"cp -r angular/modules/angular2/ src/angular2/"
]));

gulp.task('tsdAngular', shell.task([
	"tsd reinstall --config angular/modules/angular2/tsd.json"
]));

gulp.task('initProject', shell.task([
	"react-native init dist"
]));

gulp.task('initDeps', shell.task([
	"cd dist && npm install --save rx",
	"cd dist && npm install --save traceur",
	"cd dist && npm install --save reflect-metadata",
	"cd dist && npm install --save zone.js",
	"cd dist && npm install --save rtts_assert",
	"cd dist && npm install --save parse5",
	"cd dist && npm install --save css",
	"cd dist && npm install --save url",
	"cd dist && npm install --save angular2",
]));
