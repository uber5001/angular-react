var test_lib_1 = require('angular2/test_lib');
var forms_1 = require('angular2/forms');
function main() {
    test_lib_1.describe("Form Directives", function () {
        test_lib_1.describe("Control", function () {
            test_lib_1.it("should throw when the group is not found and the control is not set", function () {
                var c = new forms_1.ControlDirective(null);
                test_lib_1.expect(function () { c.controlOrName = 'login'; })
                    .toThrowError(new RegExp('No control group found for "login"'));
            });
            test_lib_1.it("should throw when cannot find the control in the group", function () {
                var emptyGroup = new forms_1.ControlGroupDirective(null);
                emptyGroup.controlOrName = new forms_1.ControlGroup({});
                var c = new forms_1.ControlDirective(emptyGroup);
                test_lib_1.expect(function () { c.controlOrName = 'login'; })
                    .toThrowError(new RegExp('Cannot find control "login"'));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=directives_spec.js.map
