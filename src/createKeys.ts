import { BasicParams, ParamsWithId, ParamsWithIds } from './createModel';

export function createKeys<Entity extends string>(entity: Entity) {
  const entityKeys = {
    basicUrl: entity,
    all: [entity] as const,
    byId: (id: string) => [entity, 'entity', id] as const,
    byIds: (params: ParamsWithIds) => [entity, 'byIds', params] as const,
    many: (params: BasicParams = {}) => [entity, 'many', params] as const,
    entity: ({ id, ...params }: ParamsWithId) =>
      [entity, 'entity', id, params] as const,
  } as const;

  return entityKeys;
}
