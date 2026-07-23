import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);

  const {id} =  getQuery<{id: number}>(event);
  try {
    await db.update(schema.player).set({
      name: data.name,
      number: data.number,
      isCaptain: data.isCaptain
    }).where(eq(schema.player.id, id));

    return {status: 200, response: 'Successfully updated player'};
  }
  catch {
      throw createError({
        status: 400,
        statusText: 'Could not Update Player',
      })
    }
})
