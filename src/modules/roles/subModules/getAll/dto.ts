import ValidationSchema from './validationSchema.js';
import type { IGetAllRolesDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllRolesDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 */
export default class GetAllRolesDto implements IGetAllRolesDto {
  page: number;

  constructor(data: IGetAllRolesDto) {
    this.page = data?.page;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse(this);
  }
}
