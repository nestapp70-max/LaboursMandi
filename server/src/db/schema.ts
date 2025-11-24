import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: varchar('id').primaryKey(),
  name: text('name').notNull(),
  phone: text('phone').unique().notNull(),
  role: text('role').notNull(),
  password: text('password'),
  city: text('city'),
  pincode: text('pincode'),
  createdAt: timestamp('created_at').defaultNow()
});

export const otp_codes = pgTable('otp_codes', {
  id: varchar('id').primaryKey(),
  phone: text('phone').notNull(),
  code: text('code').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow()
});
