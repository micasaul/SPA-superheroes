const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', async (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'conectado' : 'desconectado'
  res.json({ servidor: 'ok', mongo: mongoStatus })
})

const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Conectado a MongoDB')
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err.message)
    process.exit(1)
  })