import ValidationSchema from './validationSchema.js';
import type { IRemoveKeyDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     RemoveKeyDto:
 *     parameters:
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: number
 */
export default class RemoveKeyDto implements IRemoveKeyDto {
  id: string;

  constructor(data: IRemoveKeyDto) {
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
