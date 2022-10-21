import mongoose from 'mongoose'

const loadModels = () => {
  require('./User')
  require('./Summary')
}

export const ConnectDB = async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('overwriteModels', true)
    }

    loadModels()

    if (mongoose.connection.readyState === 1) {
      return (global as any).mongoose
    }

    if (!(global as any).mongoose) {
      const mongoDBConn = `mongodb://localhost/tidy`
      console.log('[DB] Connecting to database...')
      console.time('[DB] Connected')
      ;(global as any).mongoose = await mongoose.connect(
        process.env.MONGODB_URI || mongoDBConn
      )

      console.timeEnd('[DB] Connected')
    }

    loadModels()

    return (global as any).mongoose
  } catch (e) {
    console.log('[DB] Database error', e)
    return null
  }
}
