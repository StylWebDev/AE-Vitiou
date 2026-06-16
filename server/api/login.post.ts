export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event);

  if (email === 'admin@aevitsiou.login' && password === '4WNlzf4V5jaxLCuotWHfTDheuEKhznn!') {

    await setUserSession(event, {
      user: {
        name: 'AE-Vitsiou',
      },
    })
    return {message: 'Success'}
  }
  throw createError({
    status: 401,
    message: 'Bad credentials',
  })
})
