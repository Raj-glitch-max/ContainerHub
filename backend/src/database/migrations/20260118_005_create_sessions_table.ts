// ════════════════════════════════════════════════════════════════
// Migration: Create Sessions Table (User Sessions & WebSocket)
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sessions', (table) => {
        // Primary key
        table.string('session_id', 255).primary();

        // Foreign key
        table.integer('user_id').unsigned().nullable().references('id').inTable('users').onDelete('CASCADE');

        // Session data
        table.jsonb('data').defaultTo('{}');
        table.string('ip_address', 45);
        table.string('user_agent', 500);

        // Timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('expires_at').notNullable();

        // Indexes
        table.index('user_id');
        table.index('expires_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('sessions');
}
