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
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var utils_1 = require('./utils');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var view_1 = require('angular2/src/render/dom/view/view');
/**
 * @exportedAs angular2/test
 *
 * A TestElement contains information from the Angular compiler about an
 * element and provides access to the corresponding ElementInjector and
 * underlying dom Element, as well as a way to query for children.
 */
var TestElement = (function () {
    function TestElement(_parentView, _boundElementIndex) {
        this._parentView = _parentView;
        this._boundElementIndex = _boundElementIndex;
        this._elementInjector = this._parentView.elementInjectors[this._boundElementIndex];
    }
    TestElement.create = function (elementRef) {
        return new TestElement(view_ref_1.internalView(elementRef.parentView), elementRef.boundElementIndex);
    };
    Object.defineProperty(TestElement.prototype, "componentInstance", {
        get: function () {
            if (!lang_1.isPresent(this._elementInjector)) {
                return null;
            }
            return this._elementInjector.getComponent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestElement.prototype, "dynamicallyCreatedComponentInstance", {
        get: function () {
            if (!lang_1.isPresent(this._elementInjector)) {
                return null;
            }
            return this._elementInjector.getDynamicallyLoadedComponent();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestElement.prototype, "domElement", {
        get: function () {
            return view_1.resolveInternalDomView(this._parentView.render).boundElements[this._boundElementIndex];
        },
        enumerable: true,
        configurable: true
    });
    TestElement.prototype.getDirectiveInstance = function (directiveIndex) {
        return this._elementInjector.getDirectiveAtIndex(directiveIndex);
    };
    Object.defineProperty(TestElement.prototype, "children", {
        /**
         * Get child TestElements from within the Light DOM.
         *
         * @return {List<TestElement>}
         */
        get: function () {
            var thisElementBinder = this._parentView.proto.elementBinders[this._boundElementIndex];
            return this._getChildElements(this._parentView, thisElementBinder.index);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TestElement.prototype, "componentViewChildren", {
        /**
         * Get the root TestElement children of a component. Returns an empty
         * list if the current TestElement is not a component root.
         *
         * @return {List<TestElement>}
         */
        get: function () {
            var shadowView = this._parentView.componentChildViews[this._boundElementIndex];
            if (!lang_1.isPresent(shadowView)) {
                // The current test element is not a component.
                return collection_1.ListWrapper.create();
            }
            return this._getChildElements(shadowView, null);
        },
        enumerable: true,
        configurable: true
    });
    TestElement.prototype.triggerEventHandler = function (eventName, eventObj) {
        this._parentView.triggerEventHandlers(eventName, eventObj, this._boundElementIndex);
    };
    TestElement.prototype.hasDirective = function (type) {
        if (!lang_1.isPresent(this._elementInjector)) {
            return false;
        }
        return this._elementInjector.hasDirective(type);
    };
    TestElement.prototype.inject = function (type) {
        if (!lang_1.isPresent(this._elementInjector)) {
            return null;
        }
        return this._elementInjector.get(type);
    };
    /**
     * Return the first descendant TestElememt matching the given predicate
     * and scope.
     *
     * @param {Function: boolean} predicate
     * @param {Scope} scope
     *
     * @return {TestElement}
     */
    TestElement.prototype.query = function (predicate, scope) {
        if (scope === void 0) { scope = Scope.all; }
        var results = this.queryAll(predicate, scope);
        return results.length > 0 ? results[0] : null;
    };
    /**
     * Return descendant TestElememts matching the given predicate
     * and scope.
     *
     * @param {Function: boolean} predicate
     * @param {Scope} scope
     *
     * @return {List<TestElement>}
     */
    TestElement.prototype.queryAll = function (predicate, scope) {
        if (scope === void 0) { scope = Scope.all; }
        var elementsInScope = scope(this);
        return collection_1.ListWrapper.filter(elementsInScope, predicate);
    };
    TestElement.prototype._getChildElements = function (view, parentBoundElementIndex) {
        var _this = this;
        var els = collection_1.ListWrapper.create();
        var parentElementBinder = null;
        if (lang_1.isPresent(parentBoundElementIndex)) {
            parentElementBinder = view.proto.elementBinders[parentBoundElementIndex];
        }
        for (var i = 0; i < view.proto.elementBinders.length; ++i) {
            var binder = view.proto.elementBinders[i];
            if (binder.parent == parentElementBinder) {
                collection_1.ListWrapper.push(els, new TestElement(view, i));
                var views = view.viewContainers[i];
                if (lang_1.isPresent(views)) {
                    collection_1.ListWrapper.forEach(views.views, function (nextView) {
                        els = collection_1.ListWrapper.concat(els, _this._getChildElements(nextView, null));
                    });
                }
            }
        }
        return els;
    };
    return TestElement;
})();
exports.TestElement = TestElement;
function inspectElement(elementRef) {
    return TestElement.create(elementRef);
}
exports.inspectElement = inspectElement;
/**
 * @exportedAs angular2/test
 */
var RootTestComponent = (function (_super) {
    __extends(RootTestComponent, _super);
    function RootTestComponent(componentRef) {
        _super.call(this, view_ref_1.internalView(componentRef.hostView), 0);
        this._componentParentView = view_ref_1.internalView(componentRef.hostView);
        this._componentRef = componentRef;
    }
    RootTestComponent.prototype.detectChanges = function () {
        this._componentParentView.changeDetector.detectChanges();
        this._componentParentView.changeDetector.checkNoChanges();
    };
    RootTestComponent.prototype.destroy = function () { this._componentRef.dispose(); };
    return RootTestComponent;
})(TestElement);
exports.RootTestComponent = RootTestComponent;
/**
 * @exportedAs angular2/test
 */
var Scope = (function () {
    function Scope() {
    }
    Scope.all = function (testElement) {
        var scope = collection_1.ListWrapper.create();
        collection_1.ListWrapper.push(scope, testElement);
        collection_1.ListWrapper.forEach(testElement.children, function (child) { scope = collection_1.ListWrapper.concat(scope, Scope.all(child)); });
        collection_1.ListWrapper.forEach(testElement.componentViewChildren, function (child) { scope = collection_1.ListWrapper.concat(scope, Scope.all(child)); });
        return scope;
    };
    Scope.light = function (testElement) {
        var scope = collection_1.ListWrapper.create();
        collection_1.ListWrapper.forEach(testElement.children, function (child) {
            collection_1.ListWrapper.push(scope, child);
            scope = collection_1.ListWrapper.concat(scope, Scope.light(child));
        });
        return scope;
    };
    Scope.view = function (testElement) {
        var scope = collection_1.ListWrapper.create();
        collection_1.ListWrapper.forEach(testElement.componentViewChildren, function (child) {
            collection_1.ListWrapper.push(scope, child);
            scope = collection_1.ListWrapper.concat(scope, Scope.light(child));
        });
        return scope;
    };
    return Scope;
})();
exports.Scope = Scope;
/**
 * @exportedAs angular2/test
 */
var By = (function () {
    function By() {
    }
    By.all = function () { return function (testElement) { return true; }; };
    By.css = function (selector) {
        return function (testElement) { return dom_adapter_1.DOM.elementMatches(testElement.domElement, selector); };
    };
    By.directive = function (type) {
        return function (testElement) { return testElement.hasDirective(type); };
    };
    return By;
})();
exports.By = By;
/**
 * @exportedAs angular2/test
 *
 * Builds a RootTestComponent for use in component level tests.
 */
var TestComponentBuilder = (function () {
    function TestComponentBuilder(injector) {
        this._injector = injector;
        this._viewOverrides = collection_1.MapWrapper.create();
        this._directiveOverrides = collection_1.MapWrapper.create();
        this._templateOverrides = collection_1.MapWrapper.create();
    }
    TestComponentBuilder.prototype._clone = function () {
        var clone = new TestComponentBuilder(this._injector);
        clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
        clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
        clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
        return clone;
    };
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
        var clone = this._clone();
        collection_1.MapWrapper.set(clone._templateOverrides, componentType, template);
        return clone;
    };
    /**
     * Overrides a component's {@link View}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideView = function (componentType, view) {
        var clone = this._clone();
        collection_1.MapWrapper.set(clone._viewOverrides, componentType, view);
        return clone;
    };
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
        var clone = this._clone();
        var overridesForComponent = collection_1.MapWrapper.get(clone._directiveOverrides, componentType);
        if (!lang_1.isPresent(overridesForComponent)) {
            collection_1.MapWrapper.set(clone._directiveOverrides, componentType, collection_1.MapWrapper.create());
            overridesForComponent = collection_1.MapWrapper.get(clone._directiveOverrides, componentType);
        }
        collection_1.MapWrapper.set(overridesForComponent, from, to);
        return clone;
    };
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    TestComponentBuilder.prototype.createAsync = function (rootComponentType) {
        var mockTemplateResolver = this._injector.get(template_resolver_1.TemplateResolver);
        collection_1.MapWrapper.forEach(this._viewOverrides, function (view, type) { mockTemplateResolver.setView(type, view); });
        collection_1.MapWrapper.forEach(this._templateOverrides, function (template, type) {
            mockTemplateResolver.setInlineTemplate(type, template);
        });
        collection_1.MapWrapper.forEach(this._directiveOverrides, function (overrides, component) {
            collection_1.MapWrapper.forEach(overrides, function (to, from) {
                mockTemplateResolver.overrideViewDirective(component, from, to);
            });
        });
        var rootEl = utils_1.el('<div id="root"></div>');
        var doc = this._injector.get(dom_renderer_1.DOCUMENT_TOKEN);
        // TODO(juliemr): can/should this be optional?
        dom_adapter_1.DOM.appendChild(doc.body, rootEl);
        return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader)
            .loadAsRoot(rootComponentType, '#root', this._injector)
            .then(function (componentRef) { return new RootTestComponent(componentRef); });
    };
    TestComponentBuilder = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [di_1.Injector])
    ], TestComponentBuilder);
    return TestComponentBuilder;
})();
exports.TestComponentBuilder = TestComponentBuilder;
//# sourceMappingURL=test_component_builder.js.map
