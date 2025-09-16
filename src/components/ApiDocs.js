
import React from 'react';

function ApiDocs() {
  return (
    <div className="api-docs">
      <h2>API Documentation</h2>
      
      <h3>GET /api/threats</h3>
      <p>Returns a prioritized list of all threats.</p>
      
      <h3>GET /api/threat-actors</h3>
      <p>Returns a list of all threat actors.</p>
      
      <h3>GET /api/intel-feeds</h3>
      <p>Returns a list of all intelligence feeds.</p>
      
      <h3>POST /api/search</h3>
      <p>Searches across all data sources. The request body should be a JSON object with a "query" key.</p>
      <pre>{`{
  "query": "your search query"
}`}</pre>
      
      <h3>GET /api/cve/:cveId</h3>
      <p>Returns information about a specific CVE from the NVD database, along with AI-driven feedback.</p>
      <p>Example: <code>/api/cve/CVE-2024-3400</code></p>
    </div>
  );
}

export default ApiDocs;
