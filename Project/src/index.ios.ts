/// <reference path="../node_modules/angular2/angular2.d.ts"/>
/// <reference path="../angular/modules/angular2/globals.d.ts"/>
/// <reference path="../angular/modules/angular2/traceur-runtime.d.ts"/>
/// <reference path="../node_modules//angular2/atscript/typings/node/node.d.ts"/>
//import angular2 = require ('angular2/angular2');


/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

//required for angular:
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');
//var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');

import {Component, View, Renderer, bootstrap, bind} from '../node_modules/angular2/angular2';

@Component({
	selector: 'hello-world'
})
@View({
	template: '<h1>Hello World!</h1>'
})
class HelloWorldComponent {
}

class ReactNativeRenderer extends Renderer {
}

bootstrap(HelloWorldComponent, [
	ReactNativeRenderer,
	bind(Renderer).toAlias(ReactNativeRenderer)
]);

