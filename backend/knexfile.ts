// ════════════════════════════════════════════════════════════════
// Knex Migration Configuration
// ════════════════════════════════════════════════════════════════
//
// Database migrations for PostgreSQL
// Usage:
//   npm run db:migrate       - Run all pending migrations
//   npm run db:rollback      - Rollback last migration batch
//   npm run db:seed          - Run seed files
//
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL || {
            host: 'localhost',
            port: 5432,
            database: 'containerhub',
            user: 'postgres',
            password: 'postgres',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'ts',
        },
    },

    staging: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'ts',
        },
    },

    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 20,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: './src/database/migrations',
            extension: 'ts',
        },
        seeds: {
            directory: './src/database/seeds',
            extension: 'ts',
        },
    },
};

export default config;
