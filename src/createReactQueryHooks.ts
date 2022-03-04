import { AxiosRequestConfig } from 'axios';
import { get } from 'lodash';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryObserverOptions,
  UseMutationOptions,
} from 'react-query';

export const createQuery = <ModelType>(
  key: readonly unknown[],
  fetch: (params?: object) => Promise<ModelType>,
  params?: object,
  options?: QueryObserverOptions<ModelType>,
) => useQuery<ModelType, Error>([key], () => fetch(params), options);

export const createMutation = <ModelType>(
  key: readonly unknown[],
  fetch: (params: object) => Promise<ModelType>,
  options?: UseMutationOptions<ModelType, unknown, AxiosRequestConfig, unknown>,
) => {
  const queryClient = useQueryClient();
  return useMutation<ModelType, Error, object, unknown>(
    (params: object) => fetch(params),
    {
      ...options,
      onSuccess: (responseResource, params, context) => {
        if (options && options.onSuccess) {
          options.onSuccess(responseResource, params, context);
          // ✅ invalidate the entity queries
          const entityId = get(responseResource, '_id', '');
          if (entityId) {
            queryClient.invalidateQueries([key, 'entity', entityId]);
          }
          // ✅ invalidate all the manys for this entity
          queryClient.invalidateQueries([key, 'many']);
        }
      },
    },
  );
};
