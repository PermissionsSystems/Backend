import { createHandler } from 'graphql-http/lib/use/express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import graphSchemas from '../graph/index.js';
import initAuthRoutes from './services/auth/index.js';
import initHealthRoutes from './services/health/index.js';
import { FourOhFour } from '../../errors/index.js';
import type express from 'express';
import type swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';

export default class AppRouter {
  private readonly _router: express.Router;

  constructor(router: express.Router) {
    this._router = router;
  }

  private get router(): express.Router {
    return this._router;
  }

  initRoutes(app: express.Router): void {
    app.use(
      '/graphql',
      createHandler({
        schema: graphSchemas,
      }),
    );

    initHealthRoutes();
    initAuthRoutes();
  }

  initFourOhFour(app: express.Express): void {
    app.all(/(.*)/, (_req, res) => {
      const { message, name, extensions } = new FourOhFour();

      res.status(extensions.status).send({
        error: {
          message,
          code: extensions.code,
          name,
        },
      });
    });
  }

  generateDocumentation(): void {
    const jsonPackage = JSON.parse(fs.readFileSync('package.json').toString()) as Record<string, string>;
    const options: swaggerJsdoc.Options = {
      definition: {
        openapi: '3.0.1',
        description: 'This is a REST API for Permissions system server',
        servers: [
          {
            url: 'http://localhost',
            description: 'Development server',
          },
        ],
        info: {
          title: 'Permissions system server',
          version: jsonPackage.version as string,
        },
      },
      apis: [
        './src/errors/index.ts',
        './src/modules/*/docs.ts',
        './src/modules/*/*/router.ts',
        './src/modules/*/*/docs.ts',
        './src/modules/*/*/dto.ts',
        './src/connections/router/services/*/*/index.ts',
        './src/modules/*/*/*/docs.ts',
        './src/modules/*/*/*/dto.ts',
        './src/errors/index.js',
        './src/modules/*/docs.js',
        './src/modules/*/*/router.js',
        './src/modules/*/*/docs.js',
        './src/modules/*/*/dto.js',
        './src/connections/router/services/*/*/index.js',
        './src/modules/*/*/*/docs.js',
        './src/modules/*/*/*/dto.js',
      ],
    };

    const swaggerSpec = swaggerJSDoc(options);
    this.router.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    this.router.get('docs.json', (_req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(swaggerSpec);
    });
  }
}
