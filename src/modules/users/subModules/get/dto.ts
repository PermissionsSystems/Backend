import { MissingArgError } from '../../../../errors/index.js';
import ValidationSchema from '../../validationSchema.js';
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
 *        name: email
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
  email?: string;
  id?: string;

  constructor(data: IGetUserDto) {
    this.login = data?.login;
    this.id = data?.id;
    this.email = data?.email;

    this.validate();
  }

  validate(): void {
    if (!this.login && !this.id && !this.email) throw new MissingArgError('login');

    if (this.login) ValidationSchema.parse({ login: this.login });
    if (this.id) ValidationSchema.parse({ id: this.id });
    if (this.email) ValidationSchema.parse({ email: this.email });
  }
}
