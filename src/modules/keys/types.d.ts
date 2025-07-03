import type { IKeyEntity } from './entity.js';

export interface IFormattedKey extends IKeyEntity {
  kid: string;
}
