import { GraphQLError } from 'graphql';
import Log from 'simpl-loggar';
import { ZodError } from 'zod';
import { InternalError } from '../../../errors/index.js';
import type { IFullError, IFullRawError } from '../../../types/errors.js';

// eslint-disable-next-line import/prefer-default-export
export const filterError = (error: IFullError | IFullRawError): void => {
  if ((error as IFullError)?.extensions?.code) {
    throw error;
  }

  if (error instanceof ZodError) {
    const validationErrors = error.errors.map((e) => ({
      message: e.message,
      path: e.path.join('.'),
      code: e.code,
    }));

    throw new GraphQLError('Validation Error', {
      extensions: {
        code: '400',
        validationErrors,
      },
    });
  }

  if ((error as IFullRawError)?.code) {
    throw new GraphQLError(error.message, {
      extensions: {
        code: (error as IFullRawError).code,
        status: (error as IFullRawError).status,
      },
    });
  }

  Log.error('Graph', 'Got uncought error', (error as Error).message, (error as Error).stack);
  throw new InternalError();
};
