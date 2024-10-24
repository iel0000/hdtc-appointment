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
var _a;
exports.__esModule = true;
exports.noEffectDecoratorAndCreatorSuggest = exports.noEffectDecoratorAndCreator = void 0;
var path = __importStar(require("path"));
var rule_creator_1 = require("../../rule-creator");
var utils_1 = require("../../utils");
exports.noEffectDecoratorAndCreator = 'noEffectDecoratorAndCreator';
exports.noEffectDecoratorAndCreatorSuggest = 'noEffectDecoratorAndCreatorSuggest';
exports["default"] = (0, rule_creator_1.createRule)({
    name: path.parse(__filename).name,
    meta: {
        type: 'suggestion',
        hasSuggestions: true,
        ngrxModule: 'effects',
        docs: {
            description: '`Effect` should use either the `createEffect` or the `@Effect` decorator, but not both.',
            recommended: 'error',
            suggestion: true
        },
        fixable: 'code',
        schema: [],
        messages: (_a = {},
            _a[exports.noEffectDecoratorAndCreator] = 'Using the `createEffect` and the `@Effect` decorator simultaneously is forbidden.',
            _a[exports.noEffectDecoratorAndCreatorSuggest] = 'Remove the `@Effect` decorator.',
            _a)
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var sourceCode = context.getSourceCode();
        return _a = {},
            _a["".concat(utils_1.effectCreator, ":has(").concat(utils_1.effectDecorator, ")")] = function (node) {
                var decorator = (0, utils_1.getDecorator)(node, 'Effect');
                if (!decorator) {
                    return;
                }
                var hasDecoratorArgument = Boolean((0, utils_1.getDecoratorArguments)(decorator)[0]);
                var fix = function (fixer) {
                    return getFixes(node, sourceCode, fixer, decorator);
                };
                if (hasDecoratorArgument) {
                    context.report({
                        node: node.key,
                        messageId: exports.noEffectDecoratorAndCreator,
                        // In this case where the argument to the `@Effect({...})`
                        // decorator exists, it is more appropriate to **suggest**
                        // instead of **fix**, since either simply removing or merging
                        // the arguments would likely generate unexpected behaviors and
                        // would be quite costly.
                        suggest: [
                            {
                                messageId: exports.noEffectDecoratorAndCreatorSuggest,
                                fix: fix
                            },
                        ]
                    });
                }
                else {
                    context.report({
                        node: node.key,
                        messageId: exports.noEffectDecoratorAndCreator,
                        fix: fix
                    });
                }
            },
            _a;
    }
});
function getFixes(node, sourceCode, fixer, decorator) {
    var _a;
    var importDeclarations = (_a = (0, utils_1.getImportDeclarations)(node, utils_1.NGRX_MODULE_PATHS.effects)) !== null && _a !== void 0 ? _a : [];
    var text = sourceCode.getText();
    var totalEffectDecoratorOccurrences = getEffectDecoratorOccurrences(text);
    var importRemoveFix = totalEffectDecoratorOccurrences === 1
        ? (0, utils_1.getImportRemoveFix)(sourceCode, importDeclarations, 'Effect', fixer)
        : [];
    return [fixer.remove(decorator)].concat(importRemoveFix);
}
function getEffectDecoratorOccurrences(text) {
    var _a, _b;
    return (_b = (_a = text.replace(/\s/g, '').match(/@Effect/g)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0;
}
//# sourceMappingURL=no-effect-decorator-and-creator.js.map