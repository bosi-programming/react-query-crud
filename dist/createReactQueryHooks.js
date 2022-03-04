"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMutation = exports.createQuery = void 0;
const lodash_1 = require("lodash");
const react_query_1 = require("react-query");
const createQuery = (key, fetch, params, options) => (0, react_query_1.useQuery)([key], () => fetch(params), options);
exports.createQuery = createQuery;
const createMutation = (key, fetch, options) => {
    const queryClient = (0, react_query_1.useQueryClient)();
    return (0, react_query_1.useMutation)((params) => fetch(params), Object.assign(Object.assign({}, options), { onSuccess: (responseResource, params, context) => {
            if (options && options.onSuccess) {
                options.onSuccess(responseResource, params, context);
                const entityId = (0, lodash_1.get)(responseResource, '_id', '');
                if (entityId) {
                    queryClient.invalidateQueries([key, 'entity', entityId]);
                }
                queryClient.invalidateQueries([key, 'many']);
            }
        } }));
};
exports.createMutation = createMutation;
//# sourceMappingURL=createReactQueryHooks.js.map