import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { QueryObserverOptions, UseMutationOptions } from 'react-query';
import { createKeys } from './createKeys';
import {
  createModel,
  ParamsWithId,
  ParamsWithIds,
  BasicParams,
  CustomFetch,
} from './createModel';
import { createQuery, createMutation } from './createReactQueryHooks';

export const createCrud = <ModelType>(
  entityName: string,
  axiosService: AxiosInstance,
) => {
  const keys = createKeys(entityName);
  const model = createModel<ModelType>(keys, axiosService);

  const mutationFactory =
    (fetchFunction: (params: object) => Promise<ModelType>) =>
    (
      options: UseMutationOptions<
        ModelType,
        unknown,
        AxiosRequestConfig,
        unknown
      >,
    ) =>
      createMutation<ModelType>(model.keys.all, fetchFunction, options);

  return {
    keys,
    fetchById: (
      params: ParamsWithId,
      options?: QueryObserverOptions<ModelType>,
    ) =>
      createQuery<ModelType>(
        model.keys.byId(params.id),
        model.fetchById,
        params,
        options,
      ),
    fetchByIds: (
      params: ParamsWithIds,
      options?: QueryObserverOptions<{
        page: number;
        size: number;
        response: ModelType[];
      }>,
    ) =>
      createQuery<{ page: number; size: number; response: ModelType[] }>(
        model.keys.byIds(params),
        model.fetchByIds,
        params,
        options,
      ),
    fetchMany: (
      params?: BasicParams,
      options?: QueryObserverOptions<{
        page: number;
        size: number;
        response: ModelType[];
      }>,
    ) =>
      createQuery<{ page: number; size: number; response: ModelType[] }>(
        model.keys.many(params),
        model.fetchMany,
        params,
        options,
      ),
    customFetch: <CustomType>(
      params: CustomFetch,
      options?: QueryObserverOptions<CustomType>,
    ) =>
      createQuery<CustomType>(
        model.keys.many(params),
        model.customFetch,
        params,
        options,
      ),
    create: mutationFactory(model.create),
    edit: mutationFactory(model.edit),
    delete: mutationFactory(model.delete),
    deleteByIds: mutationFactory(model.deleteByIds),
    customRequest: <CustomType>(
      options: UseMutationOptions<
        CustomType,
        unknown,
        AxiosRequestConfig,
        unknown
      >,
    ) =>
      createMutation<CustomType>(model.keys.all, model.customRequest, options),
  };
};
