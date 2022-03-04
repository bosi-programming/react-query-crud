"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCrud = void 0;
const createKeys_1 = require("./createKeys");
const createModel_1 = require("./createModel");
const createReactQueryHooks_1 = require("./createReactQueryHooks");
const createCrud = (entityName, axiosService) => {
    const keys = (0, createKeys_1.createKeys)(entityName);
    const model = (0, createModel_1.createModel)(keys, axiosService);
    const mutationFactory = (fetchFunction) => (options) => (0, createReactQueryHooks_1.createMutation)(model.keys.all, fetchFunction, options);
    return {
        keys,
        fetchById: (params, options) => (0, createReactQueryHooks_1.createQuery)(model.keys.byId(params.id), model.fetchById, params, options),
        fetchByIds: (params, options) => (0, createReactQueryHooks_1.createQuery)(model.keys.byIds(params), model.fetchByIds, params, options),
        fetchMany: (params, options) => (0, createReactQueryHooks_1.createQuery)(model.keys.many(params), model.fetchMany, params, options),
        customFetch: (params, options) => (0, createReactQueryHooks_1.createQuery)(model.keys.many(params), model.customFetch, params, options),
        create: mutationFactory(model.create),
        edit: mutationFactory(model.edit),
        delete: mutationFactory(model.delete),
        deleteByIds: mutationFactory(model.deleteByIds),
        customRequest: (options) => (0, createReactQueryHooks_1.createMutation)(model.keys.all, model.customRequest, options),
    };
};
exports.createCrud = createCrud;
//# sourceMappingURL=index.js.map