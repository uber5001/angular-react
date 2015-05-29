import { Injector } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
import { View } from 'angular2/src/core/annotations_impl/view';
import { ElementInjector } from 'angular2/src/core/compiler/element_injector';
import { AppView } from 'angular2/src/core/compiler/view';
import { ComponentRef } from 'angular2/src/core/compiler/dynamic_component_loader';
import { ElementRef } from 'angular2/src/core/compiler/element_ref';
/**
 * @exportedAs angular2/test
 *
 * A TestElement contains information from the Angular compiler about an
 * element and provides access to the corresponding ElementInjector and
 * underlying dom Element, as well as a way to query for children.
 */
export declare class TestElement {
    private _parentView;
    private _boundElementIndex;
    _elementInjector: ElementInjector;
    constructor(_parentView: AppView, _boundElementIndex: number);
    static create(elementRef: ElementRef): TestElement;
    componentInstance: any;
    dynamicallyCreatedComponentInstance: any;
    domElement: any;
    getDirectiveInstance(directiveIndex: number): any;
    /**
     * Get child TestElements from within the Light DOM.
     *
     * @return {List<TestElement>}
     */
    children: List<TestElement>;
    /**
     * Get the root TestElement children of a component. Returns an empty
     * list if the current TestElement is not a component root.
     *
     * @return {List<TestElement>}
     */
    componentViewChildren: List<TestElement>;
    triggerEventHandler(eventName: any, eventObj: any): void;
    hasDirective(type: Type): boolean;
    inject(type: Type): any;
    /**
     * Return the first descendant TestElememt matching the given predicate
     * and scope.
     *
     * @param {Function: boolean} predicate
     * @param {Scope} scope
     *
     * @return {TestElement}
     */
    query(predicate: Function, scope?: typeof Scope.all): TestElement;
    /**
     * Return descendant TestElememts matching the given predicate
     * and scope.
     *
     * @param {Function: boolean} predicate
     * @param {Scope} scope
     *
     * @return {List<TestElement>}
     */
    queryAll(predicate: Function, scope?: typeof Scope.all): List<TestElement>;
    _getChildElements(view: AppView, parentBoundElementIndex: number): List<TestElement>;
}
export declare function inspectElement(elementRef: ElementRef): TestElement;
/**
 * @exportedAs angular2/test
 */
export declare class RootTestComponent extends TestElement {
    _componentRef: ComponentRef;
    _componentParentView: AppView;
    constructor(componentRef: ComponentRef);
    detectChanges(): void;
    destroy(): void;
}
/**
 * @exportedAs angular2/test
 */
export declare class Scope {
    static all(testElement: any): List<TestElement>;
    static light(testElement: any): List<TestElement>;
    static view(testElement: any): List<TestElement>;
}
/**
 * @exportedAs angular2/test
 */
export declare class By {
    static all(): Function;
    static css(selector: string): Function;
    static directive(type: Type): Function;
}
/**
 * @exportedAs angular2/test
 *
 * Builds a RootTestComponent for use in component level tests.
 */
export declare class TestComponentBuilder {
    _injector: Injector;
    _viewOverrides: Map<Type, View>;
    _directiveOverrides: Map<Type, Map<Type, Type>>;
    _templateOverrides: Map<Type, string>;
    constructor(injector: Injector);
    _clone(): TestComponentBuilder;
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    overrideTemplate(componentType: Type, template: string): TestComponentBuilder;
    /**
     * Overrides a component's {@link View}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    overrideView(componentType: Type, view: View): TestComponentBuilder;
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    overrideDirective(componentType: Type, from: Type, to: Type): TestComponentBuilder;
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    createAsync(rootComponentType: Type): Promise<RootTestComponent>;
}
