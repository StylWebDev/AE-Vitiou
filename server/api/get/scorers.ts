import {db, schema} from '@nuxthub/db'
import { eq, sql, desc } from "drizzle-orm";
import {exists} from "~/utils";

export default defineEventHandler(async (event) => {
  const query = getQuery<{matchId: number}>(event);
  try {
    if (!exists(query.matchId)) {
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
    }else {
      const matchScorers = await db
        .select({
          player: schema.player,
          ga: schema.goals.ga
        })
        .from(schema.player)
        .innerJoin(
          schema.goals,
          eq(schema.player.id, schema.goals.playerId)
        )
        .where(eq(schema.goals.matchId, query.matchId))

      return {
        status: 200,
        response: matchScorers,
      };
    }

  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Get Players',
    })
  }
})
