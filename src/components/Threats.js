
import React, { useEffect, useState, useCallback } from 'react';

function Threats() {
  const [threats, setThreats] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchThreats = useCallback(() => {
    fetch('http://localhost:3001/api/threats')
      .then(response => response.json())
      .then(data => {
        setThreats(data);
        setLastUpdated(new Date());
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    fetchThreats();
    const interval = setInterval(fetchThreats, 10000); // Fetch every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [fetchThreats]);

  const getSeverityClass = (severity) => {
    switch (severity) {
      case 'critical':
        return 'severity-critical';
      case 'high':
        return 'severity-high';
      case 'medium':
        return 'severity-medium';
      case 'low':
        return 'severity-low';
      default:
        return '';
    }
  };

  return (
    <div>
        <div className="toolbar">
          <button onClick={fetchThreats}>Refresh</button>
          {lastUpdated && <p className="last-updated-pulse">Last Updated: {lastUpdated.toLocaleTimeString()}</p>}
        </div>
        <div className="threat-table-container">
          <table className="threat-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Threat Type</th>
                <th>Severity</th>
                <th>Description</th>
                <th>Source</th>
                <th>Reported At</th>
              </tr>
            </thead>
            <tbody>
              {threats.map(threat => (
                <tr key={threat.id} className={getSeverityClass(threat.severity)}>
                  <td>{threat.id}</td>
                  <td>{threat.threat_type}</td>
                  <td>{threat.severity}</td>
                  <td>{threat.description}</td>
                  <td>{threat.source}</td>
                  <td>{threat.reported_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default Threats;
