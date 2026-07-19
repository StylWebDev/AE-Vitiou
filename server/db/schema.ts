import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const player = sqliteTable('players', {
  id: integer().primaryKey({ autoIncrement: true }),
  number: integer({mode: 'number'}),
  name: text().notNull(),
  pos: text({enum: ['GK' , 'DEF' , 'MID' , 'FWD']}),
  position: text(),
  ga: integer(),
  isCaptain: integer({mode: 'boolean'}),
})

