import {DomProtoView, resolveInternalDomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {Renderer, RenderProtoViewRef, RenderViewRef, EventDispatcher} from 'angular2/src/render/api';
import {NG_BINDING_CLASS} from 'angular2/src/render/dom/util';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {resolveInternalReactNativeView, ReactNativeViewRef, ReactNativeView} from './view';
import {ReactNativeElement} from './native_element';

//Taken from a search of react-native for file names that match: /(RCT[^/]*)Manager\.m

export class ReactNativeRenderer extends Renderer {

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
		console.log("detachFreeHostView", arguments);
	}

	createView(protoViewRef: RenderProtoViewRef): RenderViewRef {
		console.log("createView", arguments);
		var protoView = resolveInternalDomProtoView(protoViewRef);
		return new ReactNativeViewRef(this._createView(protoView));
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
		var parent = hostView.boundElements[elementIndex];
		var children = componentView.rootChildElements;
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			parent.insertChildAtIndex(child, i);
		}
	}

	detachComponentView(hostViewRef: RenderViewRef, boundElementIndex: number, componentViewRef: RenderViewRef) {
		console.log("detachComponentView", arguments);
	}

	attachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, viewRef: RenderViewRef) {
		console.log("attachViewInContainer", arguments);
	}

	detachViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, viewRef: RenderViewRef) {
		console.log("detachViewInContainer", arguments);
	}

	hydrateView(viewRef: RenderViewRef) {
		console.log("hydrateView", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		if (view.hydrated) throw 'The view is already hydrated.';
		view.hydrated = true;
	}

	dehydrateView(viewRef: RenderViewRef) {
		console.log("dehydrateView", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		view.hydrated = false;
		//TODO: actually dehydrate anything.
	}

	setElementProperty(viewRef: RenderViewRef, elementIndex: number, propertyName: string, propertyValue: any) {
		console.log("setElementProperty", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		var element = view.boundElements[elementIndex];
		element.setAttribute(propertyName, propertyValue);
	}

	callAction(viewRef: RenderViewRef, elementIndex: number, actionExpression: string, actionArgs: any) {
		console.log("callAction", arguments);
	}

	setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) {
		console.log("setText", arguments);
	}

	setEventDispatcher(viewRef: RenderViewRef, dispatcher: EventDispatcher) {
		console.log("setEventDispatcher", arguments);
	}

	_createView(proto: DomProtoView, isRoot = false): ReactNativeView {
		console.log(proto);
		var nativeElements;
		var boundElements = [];
		if (proto.rootBindingOffset == 0) {
			nativeElements = this._dfsAndCreateNativeElements(proto.element.children[0].children, boundElements);
		} else {
			nativeElements = this._dfsAndCreateNativeElements([proto.element], boundElements);
		}

		if (isRoot) {
			nativeElements[0].attachToNative();
		}

		return new ReactNativeView(proto, nativeElements, boundElements);
	}

	_dfsAndCreateNativeElements(childrenParam, boundElements) {
		var resultingNativeChildren = [];
		for (var i = 0; i < childrenParam.length; i++) {
			var node = childrenParam[i];
			var nativeElement;
			if (node.type == "tag") {
				nativeElement = new ReactNativeElement(node.name, node.attribs);
			} else if (node.type == "text") {
				nativeElement = new ReactNativeElement("rawtext", {text:node.data});
			}

			if (DOM.hasClass(node, NG_BINDING_CLASS)) {
				boundElements.push(nativeElement);
			}

			//create and then attach children
			if (node.children) {
				var children = this._dfsAndCreateNativeElements(node.children, boundElements);
				for (var j = 0; j < children.length; j++) {
					var child = children[j];
					nativeElement.insertChildAtIndex(child, j);
				}
			}
			resultingNativeChildren.push(nativeElement)
		}
		return resultingNativeChildren;
	}
}