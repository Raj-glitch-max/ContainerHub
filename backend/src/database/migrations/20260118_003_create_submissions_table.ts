// ════════════════════════════════════════════════════════════════
// Migration: Create Submissions Table
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('submissions', (table) => {
        // Primary key
        table.increments('id').primary();

        // Foreign keys
        table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
        table.integer('problem_id').unsigned().notNullable().references('id').inTable('problems').onDelete('CASCADE');

        // Submission details
        table.text('code').notNullable();
        table.enum('language', ['python', 'javascript', 'java']).notNullable();

        // Execution results
        table.enum('status', [
            'pending',
            'running',
            'accepted',
            'wrong_answer',
            'time_limit_exceeded',
            'memory_limit_exceeded',
            'runtime_error',
            'compilation_error',
            'system_error'
        ]).notNullable().defaultTo('pending');

        table.integer('execution_time_ms');
        table.integer('memory_used_mb');
        table.text('error_message');
        table.jsonb('test_results'); // Array of { passed: boolean, input, output, expected }

        // Metadata
        table.integer('passed_test_count').defaultTo(0);
        table.integer('total_test_count').defaultTo(0);
        table.boolean('is_best_submission').defaultTo(false); // User's best submission for this problem

        // Timestamps
        table.timestamp('created_at').defaultTo(knex.fn.now());

        // Indexes for performance
        table.index(['user_id', 'problem_id']);
        table.index(['user_id', 'status']);
        table.index('created_at');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('submissions');
}
