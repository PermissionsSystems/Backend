import type { IRoleEntity } from '../entity.js';

export interface IRoleRepository {
  getAll(page: number): Promise<IRoleEntity[]>;
  get(id: string): Promise<IRoleEntity | null>;
}
