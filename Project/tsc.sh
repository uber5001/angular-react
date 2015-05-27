tsd reinstall --config angular/modules/angular2/tsd.json
tsc -p angular/modules/angular2
cp -r angular/dist/js/cjs/* node_modules/angular2/
find node_modules/angular2 -type f -exec sed -i '' -e '$a\' {} \;
