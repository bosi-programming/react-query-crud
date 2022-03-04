import { AxiosRequestConfig } from 'axios';
import { QueryObserverOptions, UseMutationOptions } from 'react-query';
export declare const createQuery: <ModelType>(key: readonly unknown[], fetch: (params?: object) => Promise<ModelType>, params?: object, options?: QueryObserverOptions<ModelType, unknown, ModelType, ModelType, import("react-query").QueryKey>) => import("react-query").UseQueryResult<ModelType, Error>;
export declare const createMutation: <ModelType>(key: readonly unknown[], fetch: (params: object) => Promise<ModelType>, options?: UseMutationOptions<ModelType, unknown, AxiosRequestConfig<any>, unknown>) => import("react-query").UseMutationResult<ModelType, Error, object, unknown>;
