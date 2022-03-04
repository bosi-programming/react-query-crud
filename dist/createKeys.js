"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeys = void 0;
function createKeys(entity) {
    const entityKeys = {
        basicUrl: entity,
        all: [entity],
        byId: (id) => [entity, 'entity', id],
        byIds: (params) => [entity, 'byIds', params],
        many: (params = {}) => [entity, 'many', params],
        entity: (_a) => {
            var { id } = _a, params = __rest(_a, ["id"]);
            return [entity, 'entity', id, params];
        },
    };
    return entityKeys;
}
exports.createKeys = createKeys;
//# sourceMappingURL=createKeys.js.map