/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

//required for angular:
var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');
var traceur = require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');

import {Component, View, Renderer, bootstrap, bind, DOCUMENT_TOKEN} from 'angular2/angular2';
import {DOM} from 'angular2/src/dom/dom_adapter';

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

function run() {

	parse5Adapter.Parse5DomAdapter.makeCurrent();
	
	var appDoc = DOM.defaultDoc();

	var helloWorldEl = DOM.createElement('hello-world');
	DOM.appendChild(appDoc, helloWorldEl);

	bootstrap(HelloWorldComponent, [
		ReactNativeRenderer,
		// bind(Renderer).toAlias(ReactNativeRenderer),
		bind(DOCUMENT_TOKEN).toValue(appDoc)
	]);

	var ReactApp = React.createClass({
		render: function() {
			return (
				React.createElement(React.Text, null, "Woooooo!")
			);
		}
	});

	React.AppRegistry.registerComponent('dist', () => ReactApp);
}

run();