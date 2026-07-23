import {db, schema} from '@nuxthub/db'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  try {
    await db.insert(schema.player).values({...data, createdAt: new Date()});

    return {status: 200, response: 'Successfully created player'};
  }
  catch {
      throw createError({
        status: 400,
        statusText: 'Could not Create Player',
      })
    }
})
