import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { createKeys } from './createKeys';
export interface BasicParams {
    config?: AxiosRequestConfig;
    [key: string]: unknown;
}
export interface ParamsWithId extends BasicParams {
    id: string;
}
export interface ParamsWithIds extends BasicParams {
    ids: string[];
}
export interface CustomFetch extends BasicParams {
    customUrl: string;
}
export interface CustomRequest extends BasicParams {
    customUrl: string;
    method: 'post' | 'delete' | 'put' | 'patch';
}
export declare function createModel<ModelType>(keys: ReturnType<typeof createKeys>, axiosService: AxiosInstance): {
    keys: {
        readonly basicUrl: string;
        readonly all: readonly [string];
        readonly byId: (id: string) => readonly [string, "entity", string];
        readonly byIds: (params: ParamsWithIds) => readonly [string, "byIds", ParamsWithIds];
        readonly many: (params?: BasicParams) => readonly [string, "many", BasicParams];
        readonly entity: ({ id, ...params }: ParamsWithId) => readonly [string, "entity", string, {
            [key: string]: unknown;
            config?: AxiosRequestConfig<any>;
        }];
    };
    customFetch: <CustomType>(args: CustomFetch) => Promise<CustomType>;
    customRequest: <CustomType_1>(args: CustomRequest) => Promise<CustomType_1>;
    fetchById: (args: ParamsWithId) => Promise<ModelType>;
    fetchByIds: (args: ParamsWithIds) => Promise<ModelType[]>;
    fetchMany: (args: BasicParams) => Promise<ModelType[]>;
    create: (args: BasicParams) => Promise<ModelType>;
    edit: (args: BasicParams) => Promise<ModelType>;
    delete: (args: BasicParams) => Promise<ModelType>;
    deleteByIds: (args: BasicParams) => Promise<ModelType>;
};
