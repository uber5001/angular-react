var React = require('react-native');

import {DomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {RenderViewRef} from 'angular2/src/render/api';
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
	//hack for application.ts:83's registerApplication
	boundElements = [];
	boundElementProperties = [];

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
				],
				"name": "root"
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
		if (root.className == NG_BINDING_CLASS && this.boundElements[bindingIndexRef.value]) {
			reactComponentType = this.boundElements[bindingIndexRef.value];
		} else {
			//it's a React Native component
			reactComponentType = REACT_NATIVE_COMPONENTS[root.name];

			if (reactComponentType === undefined) {
				if (root.name != 'root') {
					console.log("%cUnexpected custom element: " + root.name, 'color: #ff0000', root);
				}
				//just kidding? It's a custom-named component without any ng-binding associated with it.
				//We'll just pretend it is a React Native <View>.
				reactComponentType = React.View;
			}
		}

		var props = root.attribs || {};
		//replace with bound attributes if need be.
		var boundProperties = this.boundElementProperties[bindingIndexRef.value]
		for (var i in boundProperties) {
			props[i] = boundProperties[i];
		}


		if (root.className == NG_BINDING_CLASS) {
			bindingIndexRef.value++;
		}

		var children = root.children;
		var renderedChildren = [];
		for (var i = <any>0; i < children.length; i++) {
			var child = children[i];
			if (child.type == "text") {
				//React treats strings like HTML's text nodes (not React Native's "Text" Components!)
				renderedChildren[i] = child.data;
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