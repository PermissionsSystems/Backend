import { RepositoryPostgresFactory } from '../../../../tools/abstractions/repository.js';
import type * as enums from '../../../../enums/index.js';
import type { IRoleRepository } from '../types.js';

export default class RolePostgresRepository
  extends RepositoryPostgresFactory<enums.EControllers.Roles>
  implements IRoleRepository {}
