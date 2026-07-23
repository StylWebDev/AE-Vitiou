import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const {id} =  getQuery<{id: number}>(event);
  try {
    await db.delete(schema.player).where(eq(schema.player.id, id));

    return {status: 200, response: 'Successfully delete player'};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not delete Player',
    })
  }
})
