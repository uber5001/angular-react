/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

//required for angular:
var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');

import {Component, View, bootstrap, bind, Renderer} from 'angular2/angular2';

import {ReactNativeRenderer} from './renderer'

@Component({
	selector: 'hello-world',
	hostProperties: {
		'styles.container': 'style'
	}
})
@View({
	template:
`<Text [style]='styles.welcome'>
	Welcome to React Native!
</Text><Text [style]='styles.instructions'>
	To get started, edit index.ios.js
</Text><Text [style]='styles.instructions'>
	Press Cmd+R to reload,\n
	Cmd+D or shake for dev menu
</Text>`,
	directives: []
})
class HelloWorldComponent {
	styles = React.StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F5FCFF',
		},
		welcome: {
			fontSize: 20,
			textAlign: 'center',
			margin: 10,
		},
		instructions: {
			textAlign: 'center',
			color: '#333333',
			marginBottom: 5,
		},
	});
}

function run() {

	parse5Adapter.Parse5DomAdapter.makeCurrent();

	bootstrap(HelloWorldComponent, [
		ReactNativeRenderer,
		bind(Renderer).toAlias(ReactNativeRenderer)
	]);
}

run();