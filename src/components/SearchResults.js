
import React from 'react';

function SearchResults({ results }) {
  const renderResult = (result) => {
    switch (result.resultType) {
      case './data/threats.csv':
        return (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.threat_type}</td>
            <td>{result.severity}</td>
            <td>{result.description}</td>
            <td>{result.source}</td>
            <td>{result.reported_at}</td>
          </tr>
        );
      case './data/threat_actors.csv':
        return (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.name}</td>
            <td>{result.aliases}</td>
            <td>{result.origin_country}</td>
            <td>{result.activity_status}</td>
            <td>{result.first_seen}</td>
            <td>{result.last_activity}</td>
          </tr>
        );
      case './data/intel_feeds.csv':
        return (
          <tr key={result.id}>
            <td>{result.id}</td>
            <td>{result.feed_name}</td>
            <td colSpan="4"><a href={result.feed_url} target="_blank" rel="noopener noreferrer">{result.feed_url}</a></td>
            <td>{result.last_updated}</td>
          </tr>
        );
      default:
        return null;
    }
  };

  return (
    <div className="threat-table-container">
      <h2>Search Results</h2>
      <table className="threat-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Info 1</th>
                <th>Info 2</th>
                <th>Info 3</th>
                <th>Info 4</th>
                <th>Info 5</th>
                <th>Info 6</th>
            </tr>
        </thead>
        <tbody>
          {results.map(result => renderResult(result))}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResults;
