const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {search} = require('./routes')
const app = express()
dotenv.config()

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(express.json());

app.use('/', search);

app.listen(3001, () => console.log('Servidor iniciado na porta 3001'))
