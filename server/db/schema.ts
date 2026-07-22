import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const player = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  number: integer('number',{mode: 'number'}),
  name: text('name').notNull(),
  pos: text('pos',{enum: ['GK' , 'DEF' , 'MID' , 'FWD']}),
  isCaptain: integer({mode: 'boolean'}),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull(),
})

export const matches = sqliteTable('matches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  status: text('status', {enum: ['final', 'pending', 'live']}).notNull(),
  competition: text('competition', {enum: ['championship', 'cup']}).notNull(),
  home: text('home').notNull(),
  away: text('away').notNull(),
  hs: integer('hs').notNull(),
  points: integer('points').notNull(),
  as: integer('as').notNull(),
  date: integer('date', {mode: "timestamp_ms"}),
  isTrophy: integer('trophy', {mode: 'boolean'}).notNull(),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull(),
})

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  playerId: integer('player_id').notNull().references(() => player.id, {onDelete: "cascade"}),
  matchId: integer('match_id').notNull().references(() => player.id, {onDelete: "cascade"}),
  ga: integer('ga'),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull(),
})

