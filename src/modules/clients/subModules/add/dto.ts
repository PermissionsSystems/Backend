import ValidationSchema from './validationSchema.js';
import type { IAddClientDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     AddClientDto:
 *     parameters:
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: name
 *        required: false
 *        schema:
 *          type: string
 */
export default class AddClientDto implements IAddClientDto {
  name: string;
  failRedirectUrl: string;
  redirectUrl: string;

  constructor(data: IAddClientDto) {
    this.name = data?.name;
    this.failRedirectUrl = data?.failRedirectUrl;
    this.redirectUrl = data?.redirectUrl;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse(this);
  }
}
