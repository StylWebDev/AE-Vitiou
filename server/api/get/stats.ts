import {db, schema} from '@nuxthub/db'
import { gt, or, eq, and, sql, desc } from "drizzle-orm";

export default defineEventHandler(async () => {
  try {
    const goals = await db.select({
      totalGoals: sql<number>`coalesce(cast(sum(${schema.goals.ga}) as int), 0)`,
      avgGoals: sql<number>`coalesce(cast(avg(${schema.goals.ga}) as int), 0)`,
    }).from(schema.goals)

    const wins = await db.$count(schema.matches,
      or(
        and(eq(schema.matches.home, 'ae_vitsiou'), gt(schema.matches.hs, schema.matches.as)),
        and(eq(schema.matches.away, 'ae_vitsiou'), gt(schema.matches.as, schema.matches.hs))
      )
    )

    const points = await db.select({
      totalMatches: sql<number>`count(*)`,
      points: sql<number>`coalesce(cast(sum(${schema.matches.points}) as int), 0)`
    }).from(schema.matches)

    const lastMatches = await db.select().from(schema.matches).where(eq(schema.matches.status, 'final')).orderBy(desc(schema.matches.date)).limit(5);

    const titles =  await db.$count(schema.matches, eq(schema.matches.isTrophy, true))

    const topScoredMatches = await db
      .select({
        match: schema.matches,
      })
      .from(schema.matches)
      .innerJoin(
        schema.goals,
        eq(schema.matches.id, schema.goals.matchId)
      )
      .groupBy(schema.matches.id)
      .orderBy(desc(sql`sum(${schema.goals.ga})`))
      .limit(3);



    const topScorers = await db
      .select({
        player: schema.player
      })
      .from(schema.player)
      .innerJoin(
        schema.goals,
        eq(schema.player.id, schema.goals.playerId)
      )
      .groupBy(schema.player.id)
      .orderBy(desc(sql`sum(${schema.goals.ga})`))
      .limit(5);

    return {
      status: 200,
      response: {
        ...goals[0],
        wins,
        ...points[0],
        titles,
        topScoredMatches: topScoredMatches.map(match => ({...match.match})) ,
        lastMatches,
        topScorers: topScorers.map(scorer => ({...scorer.player })) ,
      }
    };
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Get Players',
    })
  }
})
