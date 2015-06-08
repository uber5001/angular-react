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

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {DomProtoView, DomProtoViewRef, resolveInternalDomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {resolveInternalDomView} from 'angular2/src/render/dom/view/view';
import {Renderer, RenderProtoViewRef, RenderViewRef, EventDispatcher} from 'angular2/src/render/api';
import {isBlank, BaseException} from 'angular2/src/facade/lang';

import {ShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/shadow_dom_strategy';
import {EventManager} from 'angular2/src/render/dom/events/event_manager';
import {Inject, Injectable} from 'angular2/di';

import {NG_BINDING_CLASS} from 'angular2/src/render/dom/util';

const REACT_NATIVE_COMPONENTS = {
	"activityindicatorios": React.ActivityIndicatorIOS,
	"datepickerios": React.DatePickerIOS,
	"image": React.Image,
	"listview": React.ListView,
	"mapview": React.MapView,
	"navigator": React.Navigator,
	"navigatorios": React.NavigatorIOS,
	"pickerios": React.PickerIOS,
	"scrollview": React.ScrollView,
	"segmentedcontrolios": React.SegmentedControlIOS,
	"sliderios": React.SliderIOS,
	"switchios": React.SwitchIOS,
	"tabbarios": React.TabBarIOS,
	"tabbarios.item": React.TabBarIOS.Item,
	"text": React.Text,
	"textinput": React.TextInput,
	"touchablehighlight": React.TouchableHighlight,
	"touchableopacity": React.TouchableOpacity,
	"touchablewithoutfeedback": React.TouchableWithoutFeedback,
	"view": React.View,
	"webview": React.WebView,
}

@Component({
	selector: 'bar'
})
@View({
	template: '<Text>Bar</Text>'
})
class BarComponent {
}


@Component({
	selector: 'foo'
})
@View({
	template:
		'<View>'
			+ '<Text>Foo</Text>'
			+ '<Bar></Bar>'
		+ '</View>',
	directives: [
		BarComponent
	]
})
class FooComponent {
}


@Component({
	selector: 'hello-world'
})
@View({
	template:
		'<View>'
			+ '<Text>Hello World!</Text>'
			+ '<Foo></Foo>'
			+ '<Bar></Bar>'
		+ '</View>',
	directives: [
		FooComponent,
		BarComponent
	]

})
class HelloWorldComponent {
}





function resolveInternalReactNativeView(viewRef: RenderViewRef) {
	return (<ReactNativeViewRef>viewRef)._view;
}

class ReactNativeViewRef extends RenderViewRef {
	_view: ReactNativeView;
	constructor(view: ReactNativeView) {
		super();
		this._view = view;
	}
}

class ReactNativeView {
	//hack for application.ts:83's registerApplication
	boundElements = [];

	hydrated: boolean;

	reactComponent;

	renderTree;

	constructor(public proto: DomProtoView, public isRoot: boolean) {
		this.hydrated = false;
		// !
		var self = this;
		this.reactComponent = React.createClass({
			render: function() {
				return self.render();
			}
		});
	}

	hydrate() {
		//TODO: This only works because React renders async.
		//      If it hydrates before alldescendants are attached,
		//      react won't know to re-render.
		if (this.isRoot) {
			React.AppRegistry.registerComponent('dist', () => this.reactComponent);
		}
	}

	dehydrate() {

	}

	render() {
		var rootElement;
		if (this.isRoot) {
			rootElement = {
				"children": [
					this.proto.element
				]
			}
		} else {
			var rootElement = this.proto.element;
			while (rootElement.type != "root") {
				rootElement = rootElement.children[0];
			}
		}
		return (
			this._dfsRender(rootElement)
		);
	}

	_dfsRender(root, bindingIndexRef = { value: 0 }) {
		//One node rendered per call thru React.createElement
		//It need a componentType, props, and children.

		var reactComponentType;
		if (root.className == NG_BINDING_CLASS) {
			reactComponentType = this.boundElements[bindingIndexRef.value++];
		} else {
			//it's a React Native component
			reactComponentType = REACT_NATIVE_COMPONENTS[root.name];

			if (reactComponentType === undefined) {
				console.log("Unexpected custom element: " + root.name, root)
				//just kidding? It's a custom-named component without any ng-binding associated with it.
				//We'll just pretend it is a React Native <View>.
				reactComponentType = React.View;
			}
		}

		//TODO: props
		var props = null;

		var children = root.children;
		var renderedChildren = [];
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			if (child.type == "text") {
				//React treats strings like HTML's text nodes (not React Native's "Text" Components!)
				renderedChildren[i] = child.data;
				console.log(child.text);
			} else if (child.type == "tag") {
				//assume it must be a react native element
				renderedChildren[i] = this._dfsRender(child, bindingIndexRef);
			} else {
				throw "No handler for node type: " + child.type;
			}
		}

		//NOTE: this is only ok because we aren't using renderedChildren again.
		var args = renderedChildren;
		args.unshift(props);
		args.unshift(reactComponentType);

		return React.createElement.apply(React, args);
	}
}

class ReactNativeRenderer extends Renderer {

	constructor() {
		super();
		console.log("constructor", arguments);
	}

	createRootHostView(hostProtoViewRef: RenderProtoViewRef): RenderViewRef {
		console.log("createRootHostView", arguments);
		var hostProtoView = resolveInternalDomProtoView(hostProtoViewRef);
		return new ReactNativeViewRef(this._createView(hostProtoView, true));
	}
	detachFreeHostView(parentHostViewRef: RenderViewRef, hostViewRef: RenderViewRef) {
		console.log("detachFreeHostView", arguments); }

	createView(protoViewRef: RenderProtoViewRef): RenderViewRef {
		console.log("createView", arguments);
		var protoView = resolveInternalDomProtoView(protoViewRef);
		return new ReactNativeViewRef(this._createView(protoView, false));
	}

	destroyView(viewRef: RenderViewRef) {
		console.log("destroyView", arguments);
		// DomRenderer had "noop for now", so, uh...
		// noop for now
	}

	attachComponentView(hostViewRef: RenderViewRef, elementIndex: number,
			componentViewRef: RenderViewRef) {
		console.log("attachComponentView", arguments);
		var hostView = resolveInternalReactNativeView(hostViewRef);
		var componentView = resolveInternalReactNativeView(componentViewRef);
		hostView.boundElements[elementIndex] = componentView.reactComponent;
	}

	detachComponentView(hostViewRef: RenderViewRef, boundElementIndex: number,
			componentViewRef: RenderViewRef) { console.log("detachComponentView", arguments); }

	attachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number,
			viewRef: RenderViewRef) { console.log("attachViewInContainer", arguments); }

	detachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number,
			viewRef: RenderViewRef) { console.log("detachViewInContainer", arguments); }

	hydrateView(viewRef: RenderViewRef) {
		console.log("hydrateView", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		if (view.hydrated) throw new BaseException('The view is already hydrated.');
		view.hydrated = true;
		view.hydrate();
	}

	dehydrateView(viewRef: RenderViewRef) {
		console.log("dehydrateView", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		view.hydrated = false;
		view.dehydrate();
	}

	setElementProperty(viewRef: RenderViewRef, elementIndex: number, propertyName: string,
			propertyValue: any) { console.log("setElementProperty", arguments); }

	callAction(viewRef: RenderViewRef, elementIndex: number, actionExpression: string,
			actionArgs: any) { console.log("callAction", arguments); }

	setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) { console.log("setText", arguments); }

	setEventDispatcher(viewRef: RenderViewRef, dispatcher: EventDispatcher) { console.log("setEventDispatcher", arguments); }

	_createView(protoView: DomProtoView, isRoot: boolean): ReactNativeView {
		// var viewRootNodes = [inplaceElement];
		return new ReactNativeView(protoView, isRoot);
	}

}

function run() {

	parse5Adapter.Parse5DomAdapter.makeCurrent();

	bootstrap(HelloWorldComponent, [
		ReactNativeRenderer,
		bind(Renderer).toAlias(ReactNativeRenderer)
	]);
}

run();