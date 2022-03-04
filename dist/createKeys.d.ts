import { BasicParams, ParamsWithId, ParamsWithIds } from './createModel';
export declare function createKeys<Entity extends string>(entity: Entity): {
    readonly basicUrl: Entity;
    readonly all: readonly [Entity];
    readonly byId: (id: string) => readonly [Entity, "entity", string];
    readonly byIds: (params: ParamsWithIds) => readonly [Entity, "byIds", ParamsWithIds];
    readonly many: (params?: BasicParams) => readonly [Entity, "many", BasicParams];
    readonly entity: ({ id, ...params }: ParamsWithId) => readonly [Entity, "entity", string, {
        [key: string]: unknown;
        config?: import("axios").AxiosRequestConfig<any>;
    }];
};
