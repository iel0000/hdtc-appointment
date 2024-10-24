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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var _a;
exports.__esModule = true;
exports.noEffectDecoratorSuggest = exports.noEffectDecorator = void 0;
var path = __importStar(require("path"));
var rule_creator_1 = require("../../rule-creator");
var utils_1 = require("../../utils");
exports.noEffectDecorator = 'noEffectDecorator';
exports.noEffectDecoratorSuggest = 'noEffectDecoratorSuggest';
var createEffectKeyword = 'createEffect';
exports["default"] = (0, rule_creator_1.createRule)({
    name: path.parse(__filename).name,
    meta: {
        type: 'suggestion',
        hasSuggestions: true,
        ngrxModule: 'effects',
        docs: {
            description: "The `".concat(createEffectKeyword, "` is preferred as the `@Effect` decorator is deprecated."),
            recommended: 'warn',
            suggestion: true
        },
        fixable: 'code',
        schema: [],
        messages: (_a = {},
            _a[exports.noEffectDecorator] = "The `@Effect` decorator is deprecated. Use `".concat(createEffectKeyword, "` instead."),
            _a[exports.noEffectDecoratorSuggest] = "Remove the `@Effect` decorator.",
            _a)
    },
    defaultOptions: [],
    create: function (context) {
        var _a;
        var sourceCode = context.getSourceCode();
        return _a = {},
            _a[utils_1.propertyDefinitionWithEffectDecorator] = function (node) {
                var isUsingEffectCreator = (0, utils_1.isIdentifier)(node.parent.value.callee) &&
                    node.parent.value.callee.name === createEffectKeyword;
                if (isUsingEffectCreator) {
                    context.report({
                        node: node,
                        messageId: exports.noEffectDecorator,
                        suggest: [
                            {
                                messageId: exports.noEffectDecoratorSuggest,
                                fix: function (fixer) { return fixer.remove(node); }
                            },
                        ]
                    });
                }
                else {
                    context.report({
                        node: node,
                        messageId: exports.noEffectDecorator,
                        fix: function (fixer) { return getFixes(node, sourceCode, fixer); }
                    });
                }
            },
            _a;
    }
});
function getCreateEffectFix(fixer, propertyValueExpression) {
    return fixer.insertTextBefore(propertyValueExpression, "".concat(createEffectKeyword, "(() => { return "));
}
function getCreateEffectConfigFix(fixer, propertyValueExpression, configText) {
    var append = configText ? ", ".concat(configText) : '';
    return fixer.insertTextAfter(propertyValueExpression, "}".concat(append, ")"));
}
function getFixes(node, sourceCode, fixer) {
    var classDeclaration = node.parent.parent.parent;
    var propertyValueExpression = node.parent.value;
    var _a = __read((0, utils_1.getDecoratorArguments)(node), 1), decoratorArgument = _a[0];
    var configText = decoratorArgument
        ? sourceCode.getText(decoratorArgument)
        : undefined;
    return [
        fixer.remove(node),
        getCreateEffectFix(fixer, propertyValueExpression),
        getCreateEffectConfigFix(fixer, propertyValueExpression, configText),
    ].concat((0, utils_1.getImportAddFix)({
        fixer: fixer,
        importName: createEffectKeyword,
        moduleName: utils_1.NGRX_MODULE_PATHS.effects,
        node: classDeclaration
    }));
}
//# sourceMappingURL=no-effect-decorator.js.map