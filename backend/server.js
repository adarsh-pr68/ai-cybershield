const express = require('express');
const cors = require('cors');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      fs.unlinkSync(req.file.path); // Clean up uploaded file
      res.json(results);
    });
});

app.get('/api/threats', (req, res) => {
  const results = [];
  fs.createReadStream('sample_threats.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results.slice(0, 50)); // Return a limited number of rows
    });
});

app.get('/api/cves', (req, res) => {
  const results = [];
  fs.createReadStream('sample_cves.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results.slice(0, 50)); // Return a limited number of rows
    });
});

app.get('/api/ioc-alerts', (req, res) => {
  const results = [];
  fs.createReadStream('ioc_alerts.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.get('/api/threat-sources', (req, res) => {
  const results = [];
  fs.createReadStream('threat_sources.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.get('/api/global-attacks', (req, res) => {
  const results = [];
  fs.createReadStream('global_attacks.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
