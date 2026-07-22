import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  try {
    return await db.insert(schema.player).values({...data, createdAt: new Date()})
  }
  catch {
    return { status: 402, response: 'error' };
  }
})
