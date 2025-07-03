export interface IAbstractSubController {
  execute(...params: unknown[]): Promise<unknown>;
}
