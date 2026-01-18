// ════════════════════════════════════════════════════════════════
// Migration: Create Reviews Table (AI Code Reviews)
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('reviews', (table) => {
        // Primary key
        table.increments('id').primary();

        // Foreign keys
        table.integer('submission_id').unsigned().notNullable().references('id').inTable('submissions').onDelete('CASCADE');
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');

        // AI Review content
        table.text('ai_feedback').notNullable();
        table.jsonb('suggestions').defaultTo('[]'); // Array of improvement suggestions
        table.jsonb('code_analysis'); // { style_score, complexity, best_practices }

        // Scores (1-10 scale)
        table.integer('correctness_score');
        table.integer('style_score');
        table.integer('efficiency_score');
        table.integer('readability_score');
        table.integer('overall_score');

        // Metadata
        table.string('ai_model', 100).defaultTo('claude-3-5-sonnet');
        table.integer('tokens_used');
        table.boolean('is_helpful').nullable(); // User feedback

        // Timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());

        // Indexes
        table.index('user_id');
        table.index('submission_id');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('reviews');
}
