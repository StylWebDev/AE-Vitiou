import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  try {
    const count  = await db.$count(schema.player, eq(schema.player.isCaptain, true));
    if (count > 0 && data.isCaptain) {
      throw new ReferenceError(`Captain already exists`);
    }

    await db.insert(schema.player).values({...data, createdAt: new Date()});

    return {status: 200, response: 'Successfully created player'};
  }
  catch(err) {
    if (err instanceof ReferenceError) {
      throw createError({
        status: 402,
        statusText: err.message,
      })
    }else {
      throw createError({
        status: 400,
        statusText: 'Could not Create Player',
      })
    }
  }
})
