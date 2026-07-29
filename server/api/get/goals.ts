import {db, schema} from '@nuxthub/db'
import {sql} from 'drizzle-orm'

export default defineEventHandler(async () => {
  try {
    const data = await db.select({
      playerId: schema.goals.playerId,
      ga: sql<number>`cast(sum(${schema.goals.ga}) as int)`,
    }).from(schema.goals).groupBy(schema.goals.playerId);
    return {status: 200, response: data};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Get Goals',
    })
  }
})
