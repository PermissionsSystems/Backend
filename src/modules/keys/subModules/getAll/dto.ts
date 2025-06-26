import ValidationSchema from './validationSchema.js';
import type { IGetAllKeysDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetAllKeysDto:
 *     parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        schema:
 *          type: number
 */
export default class GetAllKeysDto implements IGetAllKeysDto {
  page: number;

  constructor(data: IGetAllKeysDto) {
    this.page = data?.page ?? 1;

    this.validate();
  }

  validate(): void {
    if (!this.page) ValidationSchema.parse({ ...this });
  }
}
