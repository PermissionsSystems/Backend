import ValidationSchema from './validationSchema.js';
import type { IGetRoleDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetRoleDto:
 *     parameters:
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 */
export default class GetRoleDto implements IGetRoleDto {
  id: string;

  constructor(data: IGetRoleDto) {
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse(this);
  }
}
