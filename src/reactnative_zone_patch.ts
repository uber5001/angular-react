

var patchSetClearFunction = require('zone.js/lib/patch/functions').patchSetClearFunction;
var patchSetFunction = require('zone.js/lib/patch/functions').patchSetFunction;

function apply() {
	patchSetClearFunction(global, ['timeout', 'interval', 'immediate']);
	patchSetFunction(global, ['requestAnimationFrame']);
}

export default {
	apply: apply
}