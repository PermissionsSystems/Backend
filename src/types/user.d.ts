import type { Session } from 'express-session';

export interface IUserSession extends Session {
  client?: string;
}
