import mongoose from 'mongoose'

async function connectDB (url: string): Promise<typeof mongoose> {
  return await mongoose.connect(url)
}

export = connectDB
