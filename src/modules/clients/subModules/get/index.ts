import AbstractSubController from '../../../../tools/abstractions/subController.js';
import type { IGetClientDto } from './types.js';
import type { EClientActions, EControllers } from '../../../../enums/controllers.js';
import type { IClientEntity } from '../../entity.js';

export default class GetClientController extends AbstractSubController<EControllers.Clients, EClientActions.Get> {
  async execute(data: IGetClientDto): Promise<IClientEntity[] | IClientEntity | undefined> {
    let clients: IClientEntity[] | IClientEntity | undefined = [];

    if (data.name) {
      clients = await this.repository.getByClient(data.name);
    } else {
      clients = await this.repository.getAll(data.page ?? 1);
    }

    return !data.name ? (clients as IClientEntity[]) : ((clients as IClientEntity[])[0] as IClientEntity | undefined);
  }
}
