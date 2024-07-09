const express = require('express')
const { PORT } = require('./config.js')
const router = require('./route.js')

const app = express()

app.use(express.json())

app.use(router)

app.get('/test-connection', (req, res) => {
    return res.status(200).send('ok')
})

app.listen(PORT, () => {
    console.log(`Server is up and listening on port ${PORT}`)
})