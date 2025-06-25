import UserSchema from '../../validationSchema.js';
import type { IUpdateUserDto } from './types.js';

export default class UpdateUserDto implements IUpdateUserDto {
  login?: string;
  email?: string;

  constructor(data: IUpdateUserDto) {
    this.login = data.login;
    this.email = data.email;

    this.validate();
  }

  private validate(): void {
    if (this.login) {
      UserSchema.parse({
        login: this.login,
      });
    }
    if (this.email) {
      UserSchema.parse({
        email: this.email,
      });
    }
  }
}
