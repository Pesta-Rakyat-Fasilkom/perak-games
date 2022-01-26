require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const CryptoJS = require('crypto-js')
const pako = require('pako')
const rateLimit = require('express-rate-limit')
const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./database.db')
const app = express()
const port = 3000

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '2mb' }))
app.use('/up', limiter)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/bird', (req, res) => {
    res.sendFile('bird/index.html', { root: __dirname })
})
app.use('/bird', express.static('bird'))

app.post('/up', (req, res) => {
    let decoder = new TextDecoder()
    const decompressed = pako.inflate(req.body)
    const decryptedBytes = CryptoJS.AES.decrypt(decoder.decode(decompressed), process.env.KEY)
    const data = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8))
    if (data.score < 5) {
        return res.send('ok')
    }

    db.run(`INSERT INTO game_data(uid, data) VALUES(?, ?)`, [data.uuid, JSON.stringify(data)], function (err) {
        if (err) {
            console.log(err.message)
            res.status(500).send('not ok')
        }
        res.send('ok')
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
