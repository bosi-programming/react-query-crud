import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { QueryObserverOptions, UseMutationOptions } from 'react-query';
import { ParamsWithId, ParamsWithIds, BasicParams, CustomFetch } from './createModel';
export declare const createCrud: <ModelType>(entityName: string, axiosService: AxiosInstance) => {
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
    fetchById: (params: ParamsWithId, options?: QueryObserverOptions<ModelType, unknown, ModelType, ModelType, import("react-query").QueryKey>) => import("react-query").UseQueryResult<ModelType, Error>;
    fetchByIds: (params: ParamsWithIds, options?: QueryObserverOptions<{
        page: number;
        size: number;
        response: ModelType[];
    }, unknown, {
        page: number;
        size: number;
        response: ModelType[];
    }, {
        page: number;
        size: number;
        response: ModelType[];
    }, import("react-query").QueryKey>) => import("react-query").UseQueryResult<{
        page: number;
        size: number;
        response: ModelType[];
    }, Error>;
    fetchMany: (params?: BasicParams, options?: QueryObserverOptions<{
        page: number;
        size: number;
        response: ModelType[];
    }, unknown, {
        page: number;
        size: number;
        response: ModelType[];
    }, {
        page: number;
        size: number;
        response: ModelType[];
    }, import("react-query").QueryKey>) => import("react-query").UseQueryResult<{
        page: number;
        size: number;
        response: ModelType[];
    }, Error>;
    customFetch: <CustomType>(params: CustomFetch, options?: QueryObserverOptions<CustomType, unknown, CustomType, CustomType, import("react-query").QueryKey>) => import("react-query").UseQueryResult<CustomType, Error>;
    create: (options: UseMutationOptions<ModelType, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<ModelType, Error, object, unknown>;
    edit: (options: UseMutationOptions<ModelType, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<ModelType, Error, object, unknown>;
    delete: (options: UseMutationOptions<ModelType, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<ModelType, Error, object, unknown>;
    deleteByIds: (options: UseMutationOptions<ModelType, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<ModelType, Error, object, unknown>;
    customRequest: <CustomType_1>(options: UseMutationOptions<CustomType_1, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<CustomType_1, Error, object, unknown>;
};
