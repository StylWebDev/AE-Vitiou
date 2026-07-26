import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);

  const {id} =  getQuery<{id: number}>(event);
  try {
    const [row] = await db.update(schema.matches).set({...data, date: new Date(data.date)}).where(eq(schema.player.id, id)).returning();

    return {status: 200, response: row};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Update match',
    })
  }
})
