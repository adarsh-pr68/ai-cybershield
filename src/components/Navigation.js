import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Threats</Link></li>
        <li><Link to="/threat-actors">Threat Actors</Link></li>
        <li><Link to="/intel-feeds">Intel Feeds</Link></li>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/cve-analysis">CVE Analysis</Link></li>
        <li><Link to="/api-docs">API Docs</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;