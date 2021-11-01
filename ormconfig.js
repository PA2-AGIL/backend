// const dotenv = require('dotenv');
// dotenv.config({ path: `${process.env.NODE_ENV}.env` });

module.exports = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
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
