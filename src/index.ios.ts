/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

//requiring these here has needed side effects for requiring these later within React Native
require('RCTDeviceEventEmitter');
require('RCTEventEmitter');
//require('RCTLog');

var AppRegistry = require('AppRegistry');
var ReactNativeEventEmitter = require('ReactNativeEventEmitter');

var NativeModules = require('NativeModules');
var ReactNativeTagHandles = require('ReactNativeTagHandles');

//manual dependency injection for React
//require('NodeHandle').injection.injectImplementation(require('UniversalWorkerNodeHandle'));
require('ReactUpdates').injection.injectBatchingStrategy(require('ReactDefaultBatchingStrategy'));
require('ReactUpdates').ReactReconcileTransaction = require('ReactReconcileTransaction');


AppRegistry.runApplication = function() {

	var tagRoot = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagRoot, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

	var tagView = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagView, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

	var tagText = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagText, "RCTTextField", { accessible: true, isHighlighted: false, height: 40, style: { height: 40 }, fontSize: 16, text: "foo" });

	NativeModules.UIManager.manageChildren(tagView, null, null, [tagText], [0], null);
	NativeModules.UIManager.manageChildren(tagRoot, null, null, [tagView], [0], null);
	NativeModules.UIManager.manageChildren(1, null, null, [tagRoot], [0], null);

}