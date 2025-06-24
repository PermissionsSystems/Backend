# How to start - docs

Last update: 13.01.2025

This file will try to explain, how to start this project, setup configs and databases.

TLDR;
1. [Configs](#1-configs)

## 1. Configs

This application uses 3 config files:
- devConfig.json
- prodConfig.json
- testConfig.json

DevConfig will be used, if you run your application with NODE_ENV=development. This config should be used while working on this application

ProdConfig will be used, if you run your application with NODE_ENV=production. This should be used in production env

TestConfig will be used, if you run your application on dev servers. This config only differs from production, that in code it will log debug logs and should connect to dev database.

Each config includes few elements:
```json
{
  "port": 5003,
  "myAddress": "http://localhost",
  "corsOrigin": ["http://localhost"],
  "session": {
    "secret": "secret",
    "secured": true
  },
  "diagnostics": {
    "reqTime": false
    "logRequests": false
  },
  "postgres": {
    "user": "postgresUser",
    "password": "postgresPassword",
    "host": "host",
    "db": "db",
    "port": 5432
  }
}
```

Port is port, that application will use

MyAddress is address, that will be used to host this application.

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

Session is config for express session. 

Postgres is postgres config

Diagnostics are diagnostic options, which will help you analyze and debug your operations. It supports few options, like:

- ReqTime - count time for each request. Each time will be logged and will look like this
- LogRequests - log every request when it comes. Currently there is no filtering done for fields, so you can end up logging user's credentials. Later, filtering options will be added

```json
[09:50:08] Log.TIME: 67fea6a3-6e4c-4467-98db-07d511b446a5 Time passed: 0.01s
[09:50:08] Log.TIME: 67fea6a3-6e4c-4467-98db-07d511b446a5 {
  "path": "/graphql",
  "method": "POST"
}
```

Where UUID v4 is random uuid created for each req. This should also have user's id take from login token ( this is a #TODO )
