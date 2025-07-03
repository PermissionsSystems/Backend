import type { EControllers } from '../../enums/index.js';
import type { IAbstractSubController } from '../../types/abstractions.js';
import type { IControllersRepository } from '../../types/controllersRepository.js';

export default abstract class AbstractSubController<T extends EControllers, N extends keyof IControllersRepository[T]>
  implements IAbstractSubController
{
  constructor(repository: IControllersRepository[T][N]) {
    this.repository = repository;
  }

  protected accessor repository: IControllersRepository[T][N];

  abstract execute(...params: unknown[]): Promise<unknown>;
}
