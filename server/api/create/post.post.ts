import {db, schema} from '@nuxthub/db'

export default defineEventHandler(async  (event) => {
  const data = await readBody(event);

  try {
    await db.insert(schema.blog).values(
      {
        ...data,
        img: data.img ? Buffer.from(data.img) : null,
        date: new Date()
      });

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
