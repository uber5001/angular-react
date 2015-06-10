/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

require('RCTDeviceEventEmitter')
var AppRegistry = require('AppRegistry');
console.log(AppRegistry);

var NativeModules = require('NativeModules');
console.log(NativeModules);
var ReactNativeTagHandles = require('ReactNativeTagHandles');

var ReactUpdates = require('ReactUpdates');
ReactUpdates.injection.injectBatchingStrategy(require('ReactDefaultBatchingStrategy'));
ReactUpdates.ReactReconcileTransaction = require('ReactReconcileTransaction');

AppRegistry.runApplication = function() {

	var tagRoot = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagRoot, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

	var tagView = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagView, "RCTView", { "position": "absolute", "left": 0, "top": 0, "right": 0, "bottom": 0 });

	var tagText = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagText, "RCTText", { accessible: true, isHighlighted: false });

	var tagRawText = ReactNativeTagHandles.allocateTag();
	NativeModules.UIManager.createView(tagRawText, "RCTRawText", { text: "foobar---------" });

	NativeModules.UIManager.manageChildren(tagText, null, null, [tagRawText], [0], null);
	NativeModules.UIManager.manageChildren(tagView, null, null, [tagText], [0], null);
	NativeModules.UIManager.manageChildren(tagRoot, null, null, [tagView], [0], null);
	NativeModules.UIManager.manageChildren(1, null, null, [tagRoot], [0], null);

}