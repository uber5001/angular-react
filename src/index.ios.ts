/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//requiring these here has needed side effects for requiring these later within React Native
// require('RCTDeviceEventEmitter');
// require('RCTEventEmitter');

// //for native errors
// require('RCTLog');

// //patch timing functions
// require('RCTJSTimers');
// require('InitializeJavaScriptAppEngine');

var AppRegistry = require('AppRegistry');
var ReactNativeEventEmitter = require('ReactNativeEventEmitter');
//replacing the event handlers.
//This is better than replacing the module itself, because
//react native's packager gets confused if you have two packages 
//with the same name.
ReactNativeEventEmitter.receiveEvent = function(
	tag: number,
	topLevelType: string,
	nativeEventParam: Object
) {
	console.log(tag, topLevelType, nativeEventParam)
}
ReactNativeEventEmitter.receiveTouches = function(
	eventTopLevelType: string,
	touches: Array<Object>,
	changedIndices: Array<number>
) {
	console.log(eventTopLevelType, touches, changedIndices)
}

var NativeModules = require('NativeModules');
var ReactNativeTagHandles = require('ReactNativeTagHandles');

//manual dependency injection for React
//require('NodeHandle').injection.injectImplementation(require('UniversalWorkerNodeHandle'));
// require('ReactUpdates').injection.injectBatchingStrategy(require('ReactDefaultBatchingStrategy'));
// require('ReactUpdates').ReactReconcileTransaction = require('ReactReconcileTransaction');


//required for angular:
var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');

import {Component, View, bootstrap, bind, Renderer} from 'angular2/angular2';

import {ReactNativeRenderer} from './renderer'

@Component({
	selector: 'hello-world',
	hostAttributes: {
		"flex": 1,
		"justifyContent": "center",
		"alignItems": "center",
		"backgroundColor": "#F5FCFF"
	}
})
@View({
	template:
		  "<Text fontSize=20 margin=10>"
			+ "Welcome to React Native!"
		+ "</Text><Text textalign='center' color='#333333' marginBottom=5>"
			+ "To get started, edit index.ios.js"
		+ "</Text><Text textalign='center' color='#333333' marginBottom=5>"
			+ "Press Cmd+R to reload,\n"
			+ "Cmd+D or shake for dev menu"
		+ "</Text>",
	directives: []
})
class HelloWorldComponent {
}

AppRegistry.registerRunnable("dist", function() {
	parse5Adapter.Parse5DomAdapter.makeCurrent();

	bootstrap(HelloWorldComponent, [
		ReactNativeRenderer,
		bind(Renderer).toAlias(ReactNativeRenderer)
	]);
});

// AppRegistry.registerRunnable("dist", function() {
// 	console.log(setTimeout.toString());
// 	setTimeout(function() {
// 		var tagRoot = ReactNativeTagHandles.allocateTag();
// 		NativeModules.UIManager.createView(tagRoot, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

// 		var tagView = ReactNativeTagHandles.allocateTag();
// 		NativeModules.UIManager.createView(tagView, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

// 		var tagText = ReactNativeTagHandles.allocateTag();
// 		NativeModules.UIManager.createView(tagText, "RCTTextField", { accessible: true, isHighlighted: false, height: 40, style: { height: 40 }, fontSize: 16, text: "foo" });

// 		NativeModules.UIManager.manageChildren(tagView, null, null, [tagText], [0], null);
// 		NativeModules.UIManager.manageChildren(tagRoot, null, null, [tagView], [0], null);
// 		NativeModules.UIManager.manageChildren(1, null, null, [tagRoot], [0], null);
// 	}, 3000);
// });