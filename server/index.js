const express = require('express');
const cors = require('cors');
const csv = require('csv-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const severityScores = {
  'critical': 4,
  'high': 3,
  'medium': 2,
  'low': 1
};

// Simulate new threat data on server start
const newThreat = `
${uuidv4()},New Malware Campaign,A new malware campaign targeting financial institutions.,critical,Malware,Internal Intel,,500,pending,${new Date().toISOString()},${new Date().toISOString()}`;
if(fs.existsSync('./data/threats.csv')) {
    fs.appendFileSync('./data/threats.csv', newThreat);
}

app.get('/api/threats', (req, res) => {
  const results = [];
  fs.createReadStream('./data/threats.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.sort((a, b) => (severityScores[b.severity] || 0) - (severityScores[a.severity] || 0));
      res.json(results);
    });
});

app.get('/api/threat-actors', (req, res) => {
    const results = [];
    fs.createReadStream('./data/threat_actors.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      });
  });

  app.get('/api/intel-feeds', (req, res) => {
    const results = [];
    fs.createReadStream('./data/intel_feeds.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        res.json(results);
      });
  });

  app.post('/api/search', (req, res) => {
    const { query } = req.body;
    const searchResults = [];

    const searchFile = (filePath) => {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    for (const key in data) {
                        if (data[key].toLowerCase().includes(query.toLowerCase())) {
                            results.push({ ...data, resultType: filePath });
                            break;
                        }
                    }
                })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
    };

    Promise.all([
        searchFile('./data/threats.csv'),
        searchFile('./data/threat_actors.csv'),
        searchFile('./data/intel_feeds.csv')
    ]).then(results => {
        res.json(results.flat());
    }).catch(error => {
        res.status(500).json({ error: 'Error searching for threats' });
    });
});

app.get('/api/cve/:cveId', async (req, res) => {
    const { cveId } = req.params;
    try {
        const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId}`);
        const data = await response.json();
        const vulnerability = data.vulnerabilities[0].cve;

        let feedback = 'No specific feedback available.';
        if (vulnerability.metrics.cvssMetricV31) {
            const cvss = vulnerability.metrics.cvssMetricV31[0];
            if (cvss.cvssData.baseScore >= 9.0) {
                feedback = 'This is a critical vulnerability with a high base score. Immediate patching is highly recommended.';
            } else if (cvss.cvssData.baseScore >= 7.0) {
                feedback = 'This is a high severity vulnerability. Patching should be a priority.';
            } else if (cvss.cvssData.baseScore >= 4.0) {
                feedback = 'This is a medium severity vulnerability. Patching should be considered.';
            } else {
                feedback = 'This is a low severity vulnerability. Patching is recommended if applicable.';
            }
        }

        res.json({ vulnerability, feedback });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching CVE data' });
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
