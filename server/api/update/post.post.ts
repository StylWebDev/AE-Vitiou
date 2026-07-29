import {db, schema} from '@nuxthub/db'
import {eq} from 'drizzle-orm'
export default defineEventHandler(async  (event) => {
  const data = await readBody(event);
  const {id} =  getQuery<{id: number}>(event);

  try {
    await db.update(schema.blog).set({
      ...data,
      img: data.img ? Buffer.from(data.img) : null
    }).where(eq(schema.blog.id, id));

    return {status: 200, response: 'Successfully updated Post'};
  }
  catch {
    throw createError({
      status: 400,
      statusText: 'Could not Update Player',
    })
  }
})
