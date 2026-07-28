import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  try {
    await db
      .insert(schema.formation)
      .values({id: 1, ...data })
      .onConflictDoUpdate({
        target: schema.formation.id,
        set: {
          formation: data.formation,
          players: data.players
        }
      })
    return {status: 200, response: 'successfully updated formation'};
  }catch{
    throw createError({
      status: 400,
      statusText: "Could not get Formation"
    })
  }
})
