import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { get, omit } from 'lodash';
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

export function createModel<ModelType>(
  keys: ReturnType<typeof createKeys>,
  axiosService: AxiosInstance,
) {
  return {
    keys,

    customFetch: async <CustomType>(args: CustomFetch): Promise<CustomType> => {
      const { customUrl, ...params } = args;
      const response = await axiosService.get(`/${customUrl}`, {
        params,
      });
      return response.data;
    },

    customRequest: async <CustomType>(
      args: CustomRequest,
    ): Promise<CustomType> => {
      const { customUrl, method, ...params } = args;
      const response = await axiosService({
        method,
        url: `/${customUrl}`,
        params,
      });
      return response.data;
    },

    fetchById: async (args: ParamsWithId): Promise<ModelType> => {
      const { id, ...params } = args;
      const response = await axiosService.get<ModelType>(
        `/${keys.basicUrl}/${id}`,
        {
          params,
        },
      );
      return response.data;
    },

    fetchByIds: async (
      args: ParamsWithIds,
    ): Promise<{ page: number; size: number; response: ModelType[] }> => {
      const { ids, ...params } = args;
      const response = await axiosService.get<{
        page: number;
        size: number;
        response: ModelType[];
      }>(`/${keys.basicUrl}/crudList`, {
        params: { ...params, _id: ids.join(',') },
      });
      return response.data;
    },

    fetchMany: async (
      args: BasicParams,
    ): Promise<{ page: number; size: number; response: ModelType[] }> => {
      const response = await axiosService.get<{
        page: number;
        size: number;
        response: ModelType[];
      }>(`/${keys.basicUrl}${get(args, 'postFix', '')}`, {
        params: omit(args, 'postFix'),
      });
      return response.data;
    },

    create: async (args: BasicParams): Promise<ModelType> => {
      const { config } = args;
      const response = await axiosService.request<ModelType>({
        ...config,
        url: `/${keys.basicUrl}`,
        method: 'post',
      });
      return response.data;
    },

    edit: async (args: BasicParams): Promise<ModelType> => {
      const { id, config } = args;
      const response = await axiosService.request<ModelType>({
        ...config,
        url: `/${keys.basicUrl}/${id}`,
        method: 'put',
      });
      return response.data;
    },

    delete: async (args: BasicParams): Promise<ModelType> => {
      const { id, config } = args;
      const response = await axiosService.request<ModelType>({
        ...config,
        url: `/${keys.basicUrl}/${id}`,
        method: 'delete',
      });
      return response.data;
    },

    deleteByIds: async (args: BasicParams): Promise<ModelType> => {
      const { ids, config } = args;
      const response = await axiosService.request<ModelType>({
        params: {
          ids,
        },
        ...config,
        url: `/${keys.basicUrl}`,
        method: 'delete',
      });
      return response.data;
    },
  };
}
