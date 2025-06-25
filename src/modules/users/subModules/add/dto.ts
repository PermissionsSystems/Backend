import ValidationSchema from '../../validationSchema.js';
import type { IAddUserDto } from './types.js';

export default class AddUserDto implements IAddUserDto {
  login: string;
  email: string;

  constructor(data: IAddUserDto) {
    this.login = data.login;
    this.email = data.email;

    this.validate();
  }

  private validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
