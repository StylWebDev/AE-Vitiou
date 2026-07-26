import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  try {
    const [row] = await db.insert(schema.matches).values({...data, date: new Date(data.date), createdAt: new Date()}).returning();

    return {status: 200, response: row};
  }
  catch {
      throw createError({
        status: 400,
        statusText: 'Could not Create Match',
      })
    }
})
