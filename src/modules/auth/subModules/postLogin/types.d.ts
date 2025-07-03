export interface ILoginDto {
  login: string;
  password: string;
}

export interface ILoginOutputDto {
  cookies: {
    refresh: string;
    access: string;
  };
  redirect: string;
}

export interface ITokenData {
  sub: string;
  iat: number;
  exp: number;
}
