import { sqliteTable, text, integer, unique } from 'drizzle-orm/sqlite-core'

export const player = sqliteTable('players', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  number: integer('number',{mode: 'number'}).unique(),
  name: text('name').notNull().unique(),
  pos: text('pos',{enum: ['GK' , 'DEF' , 'MID' , 'ΕΧΤ', 'FWD']}),
  isCaptain: integer({mode: 'boolean'}).unique(),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull().default(new Date()),
})

export const matches = sqliteTable('matches', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  status: text('status', {enum: ['final', 'pending', 'live']}).notNull(),
  competition: text('competition', {enum: ['championship', 'cup']}).notNull(),
  home: text('home').notNull(),
  away: text('away').notNull(),
  hs: integer('hs').notNull().default(0),
  points: integer('points').notNull(),
  as: integer('as').notNull().default(0),
  date: integer('date', {mode: "timestamp_ms"}),
  isTrophy: integer('trophy', {mode: 'boolean'}).notNull(),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull(),
})

export const goals = sqliteTable('goals', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  playerId: integer('player_id').notNull().references(() => player.id, {onDelete: "cascade"}),
  matchId: integer('match_id').notNull().references(() => player.id, {onDelete: "cascade"}),
  ga: integer('ga').notNull(),
  createdAt: integer('created_at',{ mode: 'timestamp' }).notNull(),
}, (table) => [
    unique().on(table.matchId, table.playerId)
  ]
)

export const formation = sqliteTable('formation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  formation: text({enum: ['S433', 'S343', 'S442', 'S352', 'S451', 'S3421', 'S4231']}).notNull().default('S433'),
  players: text({mode: "json"}).notNull().default(''),
})
