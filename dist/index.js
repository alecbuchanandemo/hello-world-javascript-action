/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 252:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(252);
const { execSync } = __nccwpck_require__(81);

async function main() {
  try {
    const dstatOutput = execSync('dstat --nocolor --noupdate --output dstat.csv 1 1', { encoding: 'utf8' });
    const lines = dstatOutput.split('\n');
    const stats = lines[lines.length - 2].split(',');

    const cpu = stats[3];
    const ram = stats[6];
    const io = stats[8];

    await core.summary
      .addHeading('Resource Usage')
      .addTable([
        [{data: 'Resource', header: true}, {data: 'Usage', header: true}],
        ['CPU', `${cpu}%`],
        ['RAM', `${ram}%`],
        ['I/O', `${io}%`]
      ])
      .write();
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();
})();

module.exports = __webpack_exports__;
/******/ })()
;