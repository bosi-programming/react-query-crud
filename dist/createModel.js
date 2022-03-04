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
exports.createModel = void 0;
const lodash_1 = require("lodash");
function createModel(keys, axiosService) {
    return {
        keys,
        customFetch: async (args) => {
            const { customUrl } = args, params = __rest(args, ["customUrl"]);
            const response = await axiosService.get(`/${customUrl}`, {
                params,
            });
            return response.data;
        },
        customRequest: async (args) => {
            const { customUrl, method } = args, params = __rest(args, ["customUrl", "method"]);
            const response = await axiosService({
                method,
                url: `/${customUrl}`,
                params,
            });
            return response.data;
        },
        fetchById: async (args) => {
            const { id } = args, params = __rest(args, ["id"]);
            const response = await axiosService.get(`/${keys.basicUrl}/${id}`, {
                params,
            });
            return response.data;
        },
        fetchByIds: async (args) => {
            const { ids } = args, params = __rest(args, ["ids"]);
            const response = await axiosService.get(`/${keys.basicUrl}/crudList`, {
                params: Object.assign(Object.assign({}, params), { _id: ids.join(',') }),
            });
            return response.data;
        },
        fetchMany: async (args) => {
            const response = await axiosService.get(`/${keys.basicUrl}${(0, lodash_1.get)(args, 'postFix', '')}`, {
                params: (0, lodash_1.omit)(args, 'postFix'),
            });
            return response.data;
        },
        create: async (args) => {
            const { config } = args;
            const response = await axiosService.request(Object.assign(Object.assign({}, config), { url: `/${keys.basicUrl}`, method: 'post' }));
            return response.data;
        },
        edit: async (args) => {
            const { id, config } = args;
            const response = await axiosService.request(Object.assign(Object.assign({}, config), { url: `/${keys.basicUrl}/${id}`, method: 'put' }));
            return response.data;
        },
        delete: async (args) => {
            const { id, config } = args;
            const response = await axiosService.request(Object.assign(Object.assign({}, config), { url: `/${keys.basicUrl}/${id}`, method: 'delete' }));
            return response.data;
        },
        deleteByIds: async (args) => {
            const { ids, config } = args;
            const response = await axiosService.request(Object.assign(Object.assign({ params: {
                    ids,
                } }, config), { url: `/${keys.basicUrl}`, method: 'delete' }));
            return response.data;
        },
    };
}
exports.createModel = createModel;
//# sourceMappingURL=createModel.js.map