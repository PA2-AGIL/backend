const dbConfig = {
  logging: process.env.TYPEORM_LOGGING,
  entities: ['./dist/database/entities/**/*.{js,ts}'],
  migrations: ['./dist/database/migrations/*.{js,ts}'],
  subscribers: ['./dist/database/subscribers/*.{js,ts}'],
  cli: {
    entitiesDir: './src/database/entities',
    migrationsDir: './src/database/migrations',
    subscribersDir: './src/database/subscribers',
  },
};

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME || 'postgres',
      password: process.env.TYPEORM_PASSWORD || 'admin',
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      migrationsRun: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.test.sqlite',
      migrationsRun: true,
    });
    break;
  case 'prod':
    Object.assign(dbConfig, {
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      synchronize: process.env.TYPEORM_SYNCHRONIZE,
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('Invalid Environment');
}

module.exports = dbConfig;
