import type express from 'express';

export type IAsyncRoute<This, T, I extends express.Request = express.Request> = (
  target: (this: This, req: I, res: express.Response, next?: express.NextFunction) => Promise<T>,
  context: ClassMethodDecoratorContext<This, (this: This, req: I, res: express.Response) => Promise<T>>,
) => undefined | (() => Promise<T>);

export type IRoute<This, T, I extends express.Request = express.Request> = (
  target: (this: This, req: I, res: express.Response, next?: express.NextFunction) => T,
  context: ClassMethodDecoratorContext<This, (this: This, req: I, res: express.Response) => T>,
) => undefined | (() => T);
