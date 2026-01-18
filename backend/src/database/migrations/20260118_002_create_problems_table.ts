// ════════════════════════════════════════════════════════════════
// Migration: Create Problems Table
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('problems', (table) => {
        // Primary key
        table.increments('id').primary();

        // Problem metadata
        table.string('title', 255).notNullable().index();
        table.string('slug', 255).unique().notNullable().index();
        table.text('description').notNullable();
        table.enum('difficulty', ['easy', 'medium', 'hard']).notNullable().index();

        // Problem details
        table.jsonb('constraints').defaultTo('[]');
        table.jsonb('examples').defaultTo('[]');
        table.jsonb('test_cases').notNullable();
        table.jsonb('starter_code').defaultTo('{}'); // { python: "", javascript: "", java: "" }

        // Solution (hidden from users)
        table.text('solution_code');
        table.text('solution_explanation');

        // Statistics
        table.integer('attempt_count').defaultTo(0);
        table.integer('submit_count').defaultTo(0);
        table.integer('accepted_count').defaultTo(0);
        table.decimal('acceptance_rate', 5, 2).defaultTo(0);

        // Categorization
        table.jsonb('tags').defaultTo('[]');
        table.jsonb('companies').defaultTo('[]');
        table.string('category', 100); // Arrays, Strings, DP, etc.

        // Metadata
        table.integer('time_limit_ms').defaultTo(5000);
        table.integer('memory_limit_mb').defaultTo(256);
        table.boolean('is_premium').defaultTo(false);
        table.boolean('is_active').defaultTo(true);

        // Timestamps
        table.timestamps(true, true);

        // Indexes for performance
        table.index(['difficulty', 'is_active']);
        table.index(['category', 'is_active']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('problems');
}
