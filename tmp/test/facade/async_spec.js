var test_lib_1 = require('angular2/test_lib');
var async_1 = require('angular2/src/facade/async');
function main() {
    test_lib_1.describe('EventEmitter', function () {
        var emitter;
        test_lib_1.beforeEach(function () { emitter = new async_1.EventEmitter(); });
        test_lib_1.it("should call the next callback", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (value) {
                test_lib_1.expect(value).toEqual(99);
                async.done();
            });
            async_1.ObservableWrapper.callNext(emitter, 99);
        }));
        test_lib_1.it("should call the throw callback", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (error) {
                test_lib_1.expect(error).toEqual("Boom");
                async.done();
            });
            async_1.ObservableWrapper.callThrow(emitter, "Boom");
        }));
        test_lib_1.it("should work when no throw callback is provided", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (_) { async.done(); });
            async_1.ObservableWrapper.callThrow(emitter, "Boom");
        }));
        test_lib_1.it("should call the return callback", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (_) { }, function () { async.done(); });
            async_1.ObservableWrapper.callReturn(emitter);
        }));
        test_lib_1.it("should subscribe to the wrapper asynchronously", function () {
            var called = false;
            async_1.ObservableWrapper.subscribe(emitter, function (value) { called = true; });
            async_1.ObservableWrapper.callNext(emitter, 99);
            test_lib_1.expect(called).toBe(false);
        });
        // TODO: vsavkin: add tests cases
        // should call dispose on the subscription if generator returns {done:true}
        // should call dispose on the subscription on throw
        // should call dispose on the subscription on return
    });
}
exports.main = main;
//# sourceMappingURL=async_spec.js.map
