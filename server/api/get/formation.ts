import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async () => {
  try {
    const data = await db.select().from(schema.formation);

    return {status: 200, response: data[0]};
  }catch{
    throw createError({
      status: 400,
      statusText: "Could not get Formation"
    })
  }
})
