import ValidationSchema from './validationSchema.js';
import { MissingArgError } from '../../../../errors/index.js';
import type { IGetUserDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     GetUserDto:
 *     parameters:
 *      - in: query
 *        name: login
 *        required: false
 *        schema:
 *          type: string
 *      - in: query
 *        name: id
 *        required: false
 *        schema:
 *          type: string
 */
export default class GetUserDto implements IGetUserDto {
  login?: string;
  id?: string;

  constructor(data: IGetUserDto) {
    this.login = data?.login;
    this.id = data?.id;

    this.validate();
  }

  validate(): void {
    if (!this.login && !this.id) throw new MissingArgError('login');

    if (this.login) ValidationSchema.parse({ login: this.login });
    if (this.id) ValidationSchema.parse({ id: this.id });
  }
}
