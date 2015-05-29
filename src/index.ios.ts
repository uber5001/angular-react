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

import {Component, View, Renderer, bootstrap, bind} from 'angular2/angular2';

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

var Project = React.createClass({
	render: function() {
		return (
			React.createElement(React.Text, null, "Woooooo!")
		);
	}
});

React.AppRegistry.registerComponent('Project', () => Project);
