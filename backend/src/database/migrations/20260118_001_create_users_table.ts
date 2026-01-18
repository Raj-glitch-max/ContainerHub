// ════════════════════════════════════════════════════════════════
// Migration: Create Users Table
// ════════════════════════════════════════════════════════════════

import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        // Primary key
        table.increments('id').primary();

        // Authentication
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password_hash').notNullable();

        // Verification & Reset Tokens
        table.boolean('email_verified').defaultTo(false);
        table.string('verification_token');
        table.timestamp('verification_expires');
        table.string('reset_token');
        table.timestamp('reset_expires');

        // Profile information
        table.string('full_name', 255);
        table.text('bio');
        table.string('profile_picture_url', 500);

        // User preferences
        table.enum('skill_level', ['beginner', 'intermediate', 'advanced']).defaultTo('beginner');
        table.jsonb('interests').defaultTo('[]');

        // Statistics
        table.integer('total_problems_solved').defaultTo(0);
        table.decimal('acceptance_rate', 5, 2).defaultTo(0);
        table.integer('current_streak').defaultTo(0);
        table.integer('longest_streak').defaultTo(0);

        // Verification & Status
        table.boolean('email_verified').defaultTo(false);
        table.string('verification_token', 255);
        table.timestamp('verification_token_expires');
        table.boolean('is_active').defaultTo(true);
        table.enum('role', ['user', 'admin']).defaultTo('user');

        // Timestamps
        table.timestamps(true, true);

        // Soft delete
        table.timestamp('deleted_at').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
