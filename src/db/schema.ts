import {
    pgTable, uuid, varchar, text, timestamp, boolean, integer,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema} from 'drizzle-zod'
 
import {relations} from 'drizzle-orm';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', {length: 255}).unique().notNull(),  
    username: varchar('username', {length: 50}).unique().notNull(),
    passwordHash: varchar('password_hash', {length: 255}).notNull(),
    firstName: varchar('first_name', {length: 100}),
    lastName: varchar('last_name', {length: 100}),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const habits = pgTable('habits', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .references(() => users.id, {onDelete: 'cascade'})
        .notNull(),
    name: varchar('name', {length: 100}).notNull(), 
    description: text('description'),
    frequency: varchar('frequency', {length: 20}).notNull(), 
    targetCount: integer('target_count').default(2).notNull(),
    currentCount: integer('current_count').default(0).notNull(),
    isActive: boolean('is_active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export const entries = pgTable('entries', {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('habit_id')
        .references(() => habits.id, {onDelete: 'cascade'}) 
        .notNull(),
    completionDate: timestamp('completion_date').defaultNow().notNull(),
    note: text('note'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const tags = pgTable('tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 50}).notNull(),
    color: varchar('color', {length: 7}).default('#6b7280').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const habitTags = pgTable('habit_tags', {
    id: uuid('id').primaryKey().defaultRandom(),
    habitId: uuid('habit_id')
        .references(() => habits.id, {onDelete: 'cascade'})
        .notNull(),
    tagId: uuid('tag_id')
        .references(() => tags.id, {onDelete: 'cascade'})
        .notNull(),
})

export const userRelations = relations(users, ({many}) => ({
    habits: many(habits),
}))
export const habitRelations = relations(habits, ({one, many}) => ({
    user: one(users, {
        fields: [habits.userId],
        references: [users.id],
    }),
    entries: many(entries),
    habitTags: many(habitTags),
}))

export const entriesRelations = relations(entries, ({one}) => ({
    habit: one(habits, {
        fields: [entries.habitId],
        references: [habits.id],
    }),
}))

export const tagsRelations = relations(tags, ({many}) => ({
    habitTags: many(habitTags),
}))

export const habitTagRelations = relations(habitTags, ({one}) => ({
    habit: one(habits, {
        fields: [habitTags.habitId],
        references: [habits.id],
    }),
    tag: one(tags, {
        fields: [habitTags.tagId],
        references: [tags.id],
    }),
}))

export type User = typeof users.$inferSelect    
export type Habit = typeof habits.$inferSelect
export type Entry = typeof entries.$inferSelect
export type Tag = typeof tags.$inferSelect
export type HabitTag = typeof habitTags.$inferSelect

// Auto-generate Zod schemas from Drizzle tables
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export const insertHabitSchema = createInsertSchema(habits)
export const selectHabitSchema = createSelectSchema(habits)
export const insertEntrySchema = createInsertSchema(entries)
export const selectEntrySchema = createSelectSchema(entries)
export const insertTagSchema = createInsertSchema(tags)
export const selectTagSchema = createSelectSchema(tags)
export const insertHabitTagSchema = createInsertSchema(habitTags)
export const selectHabitTagSchema = createSelectSchema(habitTags)       