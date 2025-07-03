import type { IQuery } from '../../../../../types/index.js';
import type express from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

export type IGetHealthReq = express.Request<ParamsDictionary, unknown, unknown, IQuery>;
