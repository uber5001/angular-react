import {DomProtoView, resolveInternalDomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {Renderer, RenderProtoViewRef, RenderViewRef, EventDispatcher} from 'angular2/src/render/api';

import {resolveInternalReactNativeView, ReactNativeViewRef, ReactNativeView} from './view';

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
		console.log(hostView.boundElements);
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
		if (view.hydrated) throw 'The view is already hydrated.';
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
		propertyValue: any) {
		console.log("setElementProperty", arguments);
		var view = resolveInternalReactNativeView(viewRef);
		if (view.boundElementProperties[elementIndex] === undefined) {
			view.boundElementProperties[elementIndex] = {};
		}
		view.boundElementProperties[elementIndex][propertyName] = propertyValue;
	}

	callAction(viewRef: RenderViewRef, elementIndex: number, actionExpression: string,
		actionArgs: any) { console.log("callAction", arguments); }

	setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) { console.log("setText", arguments); }

	setEventDispatcher(viewRef: RenderViewRef, dispatcher: EventDispatcher) { console.log("setEventDispatcher", arguments); }

	_createView(protoView: DomProtoView, isRoot: boolean): ReactNativeView {
		// var viewRootNodes = [inplaceElement];
		return new ReactNativeView(protoView, isRoot);
	}

}