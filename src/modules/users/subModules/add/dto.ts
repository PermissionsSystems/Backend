import ValidationSchema from './validationSchema.js';
import type { IAddUserDto } from './types.js';

export default class AddUserDto implements IAddUserDto {
  login: string;
  password?: string;

  constructor(data: IAddUserDto) {
    this.login = data.login;
    this.password = data.password;

    this.validate();
  }

  private validate(): void {
    ValidationSchema.parse({ ...this });
  }
}
