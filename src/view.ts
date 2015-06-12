import {DomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {RenderViewRef} from 'angular2/src/render/api';
import {NG_BINDING_CLASS} from 'angular2/src/render/dom/util';

export function resolveInternalReactNativeView(viewRef: RenderViewRef) {
	return (<ReactNativeViewRef>viewRef)._view;
}

export class ReactNativeViewRef extends RenderViewRef {
	_view: ReactNativeView;
	constructor(view: ReactNativeView) {
		super();
		this._view = view;
	}
}

export class ReactNativeView {
	hydrated: boolean;

	renderTree;

	constructor(public proto: DomProtoView, public rootChildElements, public boundElements) {
		this.hydrated = false;
	}
}