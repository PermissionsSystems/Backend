import ValidationSchema from './validationSchema.js';
import type { IRemoveClientDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     RemoveClientDto:
 *     parameters:
 *      - in: query
 *        name: client
 *        required: true
 *        schema:
 *          type: string
 */
export default class RemoveClientDto implements IRemoveClientDto {
  client: string;

  constructor(data: IRemoveClientDto) {
    this.client = data?.client;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
