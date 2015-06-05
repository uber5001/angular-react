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

import {Component, View, bootstrap, bind, DOCUMENT_TOKEN} from 'angular2/angular2';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {DomProtoView, DomProtoViewRef, resolveInternalDomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {resolveInternalDomView} from 'angular2/src/render/dom/view/view';
import {Renderer, RenderProtoViewRef, RenderViewRef} from 'angular2/src/render/api';
import {isBlank, BaseException} from 'angular2/src/facade/lang';

import {ShadowDomStrategy} from 'angular2/src/render/dom/shadow_dom/shadow_dom_strategy';
import {EventManager} from 'angular2/src/render/dom/events/event_manager';
import {Inject, Injectable} from 'angular2/di';

@Component({
	selector: 'hello-world'
})
@View({
		template: '<Text><Text><Text><Text>Hello World!</Text></Text></Text></Text>'
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

	reactClass;
	reactRender;

	constructor(public proto: DomProtoView, isRoot: boolean) {
		this.reactClass = React.createClass({
			render: function() {
				return (
					React.createElement(React.Text, null, "Woooooo!")
				);
			}
		});
		if (isRoot) {
			React.AppRegistry.registerComponent('dist', () => this.reactClass);
		}
	}
}

@Injectable()
class ReactNativeRenderer extends Renderer {
	_document;

	constructor(@Inject(DOCUMENT_TOKEN) document) {
		super();
		console.log("constructor", arguments);
		this._document = document;
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
			componentViewRef: RenderViewRef) { console.log("attachComponentView", arguments); }

	detachComponentView(hostViewRef: RenderViewRef, boundElementIndex: number,
			componentViewRef: RenderViewRef) { console.log("detachComponentView", arguments); }

	attachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number,
			viewRef: RenderViewRef) { console.log("attachViewInContainer", arguments); }

	detachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number,
			viewRef: RenderViewRef) { console.log("detachViewInContainer", arguments); }

	hydrateView(viewRef: RenderViewRef) { console.log("hydrateView", arguments); }

	dehydrateView(viewRef: RenderViewRef) { console.log("dehydrateView", arguments); }

	setElementProperty(viewRef: RenderViewRef, elementIndex: number, propertyName: string,
			propertyValue: any) { console.log("setElementProperty", arguments); }

	callAction(viewRef: RenderViewRef, elementIndex: number, actionExpression: string,
			actionArgs: any) { console.log("callAction", arguments); }

	setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) { console.log("setText", arguments); }

	setEventDispatcher(viewRef: RenderViewRef, dispatcher: any /*api.EventDispatcher*/) { console.log("setEventDispatcher", arguments); }

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