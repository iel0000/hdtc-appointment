"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a;
exports.__esModule = true;
exports.noTypedStoreSuggest = exports.noTypedStore = void 0;
var path = __importStar(require("path"));
var rule_creator_1 = require("../../rule-creator");
var utils_1 = require("../../utils");
exports.noTypedStore = 'noTypedStore';
exports.noTypedStoreSuggest = 'noTypedStoreSuggest';
exports["default"] = (0, rule_creator_1.createRule)({
    name: path.parse(__filename).name,
    meta: {
        type: 'suggestion',
        hasSuggestions: true,
        ngrxModule: 'store',
        docs: {
            description: 'The global store should not be typed.',
            recommended: 'warn',
            suggestion: true
        },
        schema: [],
        messages: (_a = {},
            _a[exports.noTypedStore] = '`Store` should not be typed, use `Store` (without generic) instead.',
            _a[exports.noTypedStoreSuggest] = 'Remove generic from `Store`.',
            _a)
    },
    defaultOptions: [],
    create: function (context) {
        return {
            Program: function () {
                var e_1, _a;
                var _b = (0, utils_1.getNgRxStores)(context).identifiers, identifiers = _b === void 0 ? [] : _b;
                var _loop_1 = function (typeAnnotation) {
                    if (!(0, utils_1.isTSTypeReference)(typeAnnotation) ||
                        !typeAnnotation.typeParameters) {
                        return "continue";
                    }
                    var typeParameters = typeAnnotation.typeParameters;
                    context.report({
                        node: typeParameters,
                        messageId: exports.noTypedStore,
                        suggest: [
                            {
                                messageId: exports.noTypedStoreSuggest,
                                fix: function (fixer) { return fixer.remove(typeParameters); }
                            },
                        ]
                    });
                };
                try {
                    for (var identifiers_1 = __values(identifiers), identifiers_1_1 = identifiers_1.next(); !identifiers_1_1.done; identifiers_1_1 = identifiers_1.next()) {
                        var typeAnnotation = identifiers_1_1.value.typeAnnotation.typeAnnotation;
                        _loop_1(typeAnnotation);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (identifiers_1_1 && !identifiers_1_1.done && (_a = identifiers_1["return"])) _a.call(identifiers_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
    }
});
//# sourceMappingURL=no-typed-global-store.js.map