/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var React = require('react-native');
//required for angular:
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');
//var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');
var angular2_1 = require('angular2/angular2');
var HelloWorldComponent = (function () {
    function HelloWorldComponent() {
    }
    HelloWorldComponent = __decorate([
        angular2_1.Component({
            selector: 'hello-world'
        }),
        angular2_1.View({
            template: '<h1>Hello World!</h1>'
        }), 
        __metadata('design:paramtypes', [])
    ], HelloWorldComponent);
    return HelloWorldComponent;
})();
var ReactNativeRenderer = (function (_super) {
    __extends(ReactNativeRenderer, _super);
    function ReactNativeRenderer() {
        _super.apply(this, arguments);
    }
    return ReactNativeRenderer;
})(angular2_1.Renderer);
angular2_1.bootstrap(HelloWorldComponent, [
    ReactNativeRenderer,
    angular2_1.bind(angular2_1.Renderer).toAlias(ReactNativeRenderer)
]);
var Project = React.createClass({
    render: function () {
        return (React.createElement(React.Text, null, "Woooooo!"));
    }
});
React.AppRegistry.registerComponent('Project', function () { return Project; });
//# sourceMappingURL=index.ios.js.map
