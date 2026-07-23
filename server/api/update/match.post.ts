import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);

  const {id} =  getQuery<{id: number}>(event);
  try {
    await db.update(schema.matches).set({...data}).where(eq(schema.player.id, id));

    return {status: 200, response: 'Successfully updated match'};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Update match',
    })
  }
})
