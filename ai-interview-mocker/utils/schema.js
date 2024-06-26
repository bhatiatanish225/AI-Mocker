import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';

export const MockInterview = pgTable('MockInterview', {
  id: serial("id").primaryKey(),
  jsonMockResp: text().notNull(),
  jobPosition: varchar().notNull(),
  jobDesc: varchar().notNull(),
  jobExperience: varchar().notNull(),
  createdBy: varchar().notNull(),
  createdAt: varchar().notNull(),
  mockId: varchar().notNull(),
});
