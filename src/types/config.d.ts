export interface IConfig {
  myAddress: string;
  corsOrigin: string[];
  port: number;
  trustProxy: boolean;
  repository: string;
  diagnostics: {
    reqTime: boolean;
    logRequests: boolean;
  };
  postgres: {
    user: string;
    password: string;
    host: string;
    db: string;
    port: number;
  };
  session: {
    secret: string;
    secured: boolean;
    trustProxy: boolean;
  };
}
