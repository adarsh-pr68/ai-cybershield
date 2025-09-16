
import React, { useState } from 'react';

function CveAnalysis() {
  const [cveId, setCveId] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalysis = () => {
    setError(null);
    setAnalysis(null);
    fetch(`http://localhost:3001/api/cve/${cveId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('CVE not found or error fetching data.');
        }
        return response.json();
      })
      .then(data => setAnalysis(data))
      .catch(error => setError(error.message));
  };

  return (
    <div>
      <div className="toolbar">
        <input 
          type="text" 
          value={cveId} 
          onChange={(e) => setCveId(e.target.value)} 
          placeholder="Enter CVE ID (e.g., CVE-2024-3400)" 
        />
        <button onClick={handleAnalysis}>Analyze</button>
      </div>
      {error && <div className="error">{error}</div>}
      {analysis && (
        <div className="analysis-results">
          <h2>{analysis.vulnerability.id}</h2>
          <p>{analysis.vulnerability.descriptions[0].value}</p>
          <h3>AI-Driven Feedback:</h3>
          <p className="feedback">{analysis.feedback}</p>
          <h3>CVSS V3.1 Metrics:</h3>
          <pre>{JSON.stringify(analysis.vulnerability.metrics.cvssMetricV31[0].cvssData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CveAnalysis;
