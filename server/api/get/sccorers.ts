import {db, schema} from '@nuxthub/db'
import { eq, sql, desc } from "drizzle-orm";

export default defineEventHandler(async () => {
  try {
    const topScorers = await db
      .select({
        player: schema.player,
        ga: sql`sum(${schema.goals.ga})`
      })
      .from(schema.player)
      .innerJoin(
        schema.goals,
        eq(schema.player.id, schema.goals.playerId)
      )
      .groupBy(schema.player.id)
      .orderBy(desc(sql`sum(${schema.goals.ga})`))
      .limit(10);

    return {
      status: 200,
      response: topScorers,
    };
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Get Players',
    })
  }
})
