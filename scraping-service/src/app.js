const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const scraperRouter = require('./routes/scraper.route');

app.use('/scraper', scraperRouter);

app.get('/health', (req, res) => {
    res.send({ status: 'OK' })
  })

module.exports = app;
