import type { IKeyEntity } from '../../entity.js';

export type IAddKeyDto = Omit<IKeyEntity, 'id' | 'createdAt'>;
