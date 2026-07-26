import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'

export default defineEventHandler(async (event) => {
  const data = await readBody(event);
  try {
    await db.update(schema.formation).set({...data}).where(eq(schema.formation.id,1));
    return {status: 200, response: 'successfully updated formation'};
  }catch{
    throw createError({
      status: 400,
      statusText: "Could not get Formation"
    })
  }
})
