import type { ILoginDto } from '../../../../../modules/auth/subModules/postLogin/types.js';
import type { IQuery } from '../../../../../types/index.js';
import type express from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

export type IPostLoginReq = express.Request<ParamsDictionary, unknown, ILoginDto, IQuery>;
