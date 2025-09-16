
import React, { useEffect, useState } from 'react';

function ThreatActors() {
  const [actors, setActors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/threat-actors')
      .then(response => response.json())
      .then(data => setActors(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="threat-table-container">
      <table className="threat-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Aliases</th>
            <th>Origin Country</th>
            <th>Activity Status</th>
            <th>First Seen</th>
            <th>Last Activity</th>
          </tr>
        </thead>
        <tbody>
          {actors.map(actor => (
            <tr key={actor.id}>
              <td>{actor.id}</td>
              <td>{actor.name}</td>
              <td>{actor.aliases}</td>
              <td>{actor.origin_country}</td>
              <td>{actor.activity_status}</td>
              <td>{actor.first_seen}</td>
              <td>{actor.last_activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ThreatActors;
