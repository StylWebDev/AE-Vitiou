import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async () => {
  try {
    const data = await db.select().from(schema.player);
    return {status: 200, response: data};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Create Player',
    })
  }
})
