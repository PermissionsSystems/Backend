import ValidationSchema from './validationSchema.js';
import type { IGetAllUsersDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllUsersDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 */
export default class GetAllUsersDto implements IGetAllUsersDto {
  page: number;

  constructor(data: IGetAllUsersDto) {
    this.page = data?.page ?? 1;

    this.validate();
  }

  validate(): void {
    if (!this.page) ValidationSchema.parse({ ...this });
  }
}
