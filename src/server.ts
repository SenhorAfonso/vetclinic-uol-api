import express from 'express'
import router from './routes/vetclinic'
import dotenv from 'dotenv'
import connectDB from './db/connect'

const app = express()

app.use(express.json())
app.use('/api/v1/vetclinic', router)

async function start (): Promise<void> {
  try {
    dotenv.config()
    if (process.env.MONGO_URL != null) {
      await connectDB(process.env.MONGO_URL)
    }
  } catch (err: any) {
    console.log(`Error during database connection: ${err}`)
  }
}

start()
  .catch((err: any) => {
    console.log(`Error during database connection: ${err}`)
  })

export = app
