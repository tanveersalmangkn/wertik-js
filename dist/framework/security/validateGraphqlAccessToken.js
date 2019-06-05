System.register(["./isTokenValid", "./isPublicToken", "./isAuthQuery"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var get, allowGraphql, isTokenValid_1, isPublicToken_1, isAuthQuery_1;
    var __moduleName = context_1 && context_1.id;
    function default_1(req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, query, token, passQuery, isPublic, user, isCorrectAccessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method.toLowerCase();
                        if (method == "get" || allowGraphql) {
                            next();
                            return [2];
                        }
                        query = get(req, 'body.query', '');
                        if (!query) {
                            return [2, res.json({
                                    errorMessageType: "Error",
                                    errorMessage: "Query is required"
                                })];
                        }
                        token = get(req, 'headers.authorization', '');
                        passQuery = isAuthQuery_1["default"](query);
                        if (passQuery) {
                            return [2, next()];
                        }
                        isPublic = isPublicToken_1["default"](token);
                        if (isPublic) {
                            next();
                        }
                        return [4, isTokenValid_1["default"](token)];
                    case 1:
                        user = _a.sent();
                        isCorrectAccessToken = get(user, 'id', false);
                        if (!isCorrectAccessToken) {
                            res.json({
                                errorMessageType: "Error",
                                errorMessage: "JWT token mismatched or incorrect"
                            });
                            return [2];
                        }
                        next();
                        return [2];
                }
            });
        });
    }
    exports_1("default", default_1);
    return {
        setters: [
            function (isTokenValid_1_1) {
                isTokenValid_1 = isTokenValid_1_1;
            },
            function (isPublicToken_1_1) {
                isPublicToken_1 = isPublicToken_1_1;
            },
            function (isAuthQuery_1_1) {
                isAuthQuery_1 = isAuthQuery_1_1;
            }
        ],
        execute: function () {
            get = require("lodash").get;
            allowGraphql = get(process, 'env.ALLOW_GRAPHQL', 'FALSE') === "TRUE";
        }
    };
});
//# sourceMappingURL=validateGraphqlAccessToken.js.map