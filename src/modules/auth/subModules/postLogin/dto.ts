import ValidationSchema from './validationSchema.js';
import type { ILoginDto } from './types.js';

/**
 * @openapi
 * components:
 *   schemas:
 *     PostLoginDto:
 *     parameters:
 *      - in: query
 *        name: login
 *        required: true
 *        schema:
 *          type: string
 *      - in: query
 *        name: post
 *        required: true
 *        schema:
 *          type: string
 */
export default class LoginDto implements ILoginDto {
  login: string;
  password: string;

  constructor(data: ILoginDto) {
    this.login = data?.login;
    this.password = data?.password;

    this.validate();
  }

  validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
