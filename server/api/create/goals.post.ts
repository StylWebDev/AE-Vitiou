import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  try {
    for await (const item of data) {
      await db
        .insert(schema.goals)
        .values({ ...item, createdAt: new Date() })
        .onConflictDoUpdate({
          target: [schema.goals.matchId, schema.goals.playerId],
          set: {ga: item.ga}
        });
    }

    return {status: 200, response: 'Goals Saved'};
  }
  catch {
      throw createError({
        status: 400,
        statusText: 'Could not save goals',
      })
    }
})
