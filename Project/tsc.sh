tsd reinstall --config angular/modules/angular2/tsd.json
tsc -p angular/modules/angular2
cp -r angular/dist/js/cjs/* node_modules/angular2/
