import ValidationSchema from './validationSchema.js';
import type { IGetLoginDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetLoginDto:
 *     parameters:
 *      - in: query
 *        name: client
 *        required: true
 *        schema:
 *          type: string
 */
export default class GetLoginDto implements IGetLoginDto {
  client: string;

  constructor(data: IGetLoginDto) {
    this.client = data?.client;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
