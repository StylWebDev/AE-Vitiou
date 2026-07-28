import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async  (event) => {
  const data = await readBody(event);

  if (!data.img || !Array.isArray(data.img)) {
    throw createError({ statusCode: 400, message: 'Missing image byte stream data' })
  }

  // Convert the serializable integer array seamlessly back into a database-native binary buffer
  const dbBuffer = Buffer.from(data.img)

  try {
    await db.insert(schema.blog).values({...data, img: dbBuffer, date: new Date()});

    return {status: 200, response: 'Successfully created Post'};
  }
  catch(err) {

    console.error(err);

      throw createError({
        status: 400,
        statusText: 'Could not Create Object.',
      })
  }
})
