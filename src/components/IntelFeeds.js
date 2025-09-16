
import React, { useEffect, useState } from 'react';

function IntelFeeds() {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/intel-feeds')
      .then(response => response.json())
      .then(data => setFeeds(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="threat-table-container">
      <table className="threat-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Feed Name</th>
            <th>URL</th>
            <th>Last Updated</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {feeds.map(feed => (
            <tr key={feed.id}>
              <td>{feed.id}</td>
              <td>{feed.feed_name}</td>
              <td><a href={feed.feed_url} target="_blank" rel="noopener noreferrer">{feed.feed_url}</a></td>
              <td>{feed.last_updated}</td>
              <td>{feed.is_active}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IntelFeeds;
