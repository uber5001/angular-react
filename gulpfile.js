var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', ['build', 'watchbuild']);

gulp.task('watchbuild', function() {
	gulp.watch('src/**/*.ts', ['build']);
});

gulp.task('build', shell.task([
	'tsc -p src',
	"find dist -not \\( -path dist/node_modules -prune \\) -name '*.js' -type f -exec sed -i '' -e '$a\\' {} \\;",
]));

gulp.task('init', shell.task([
	"npm install -g gulp",
	"npm install -g tsd",
	"npm install -g react-native-cli",
	"git submodule update --init --recursive",
	"tsd reinstall --config angular/modules/angular2/tsd.json",
	"react-native init dist",
	
	"cp src/distPackage.json dist/package.json",
	"cd dist && npm install",
	
	"tsc -p angular/modules/angular2 --outDir dist/node_modules/angular2",
	"find dist -name '*.js' -type f -exec sed -i '' -e '$a\\' {} \\;",
	
	"cp src/angular2package.json dist/node_modules/angular2/package.json",

	"cp -r angular/modules/angular2/ src/angular2/",
	"cp angular/modules/angular2/*.d.ts src/angular2",
	"cp -r angular/modules/angular2/typings src/angular2/typings"
]));
