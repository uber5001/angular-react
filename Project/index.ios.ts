/// <reference path="./node_modules/angular2/atscript/typings/node/node.d.ts"/>


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

require('angular2/angular2');
var Project = React.createClass({
	render: function() {
		return (
			React.createElement(
				React.View,
				{style: styles.container},
				React.createElement(
					React.Text,
					{style: styles.welcome},
					"Welcome to React Native!"
				),
				React.createElement(
					React.Text,
					{style: styles.instructions},
					"To get started, edit index.ios.ts"
				),
				React.createElement(
					React.Text,
					{style: styles.instructions},
					"Press Cmd+R to reload,\n"
						+ "Cmd+D or shake for dev menu"
				)
			)
		);
	}
});

var styles = React.StyleSheet.create({
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

React.AppRegistry.registerComponent('Project', () => Project);
