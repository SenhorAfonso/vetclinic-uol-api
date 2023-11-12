import app from './server'

async function start (): Promise<void> {
  try {
    app.listen(5000, () => { console.log('Server listening at 5000 port') })
  } catch (err: any) {
    console.log(`Error ${err} during server start`)
  }
}

start()
  .catch((err: any) => {
    console.log(err)
  })

export default app
