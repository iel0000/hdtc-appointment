"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.createRule = void 0;
var experimental_utils_1 = require("@typescript-eslint/experimental-utils");
var utils_1 = require("./utils");
function createRule(config) {
    var configOverwrite = __assign(__assign({}, config), { create: function (context, optionsWithDefault) {
            var _a = config.meta, ngrxModule = _a.ngrxModule, version = _a.version;
            if (version !== undefined &&
                !(0, utils_1.ngrxVersionSatisfies)(utils_1.NGRX_MODULE_PATHS[ngrxModule], version)) {
                return {};
            }
            return config.create(context, optionsWithDefault);
        } });
    return experimental_utils_1.ESLintUtils.RuleCreator(utils_1.docsUrl)(configOverwrite);
}
exports.createRule = createRule;
//# sourceMappingURL=rule-creator.js.map