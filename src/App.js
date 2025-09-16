import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Threats from './components/Threats';
import ThreatActors from './components/ThreatActors';
import IntelFeeds from './components/IntelFeeds';
import Search from './components/Search';
import Dashboard from './components/Dashboard';
import CveAnalysis from './components/CveAnalysis';
import ApiDocs from './components/ApiDocs';

function App() {
  const [userRole, setUserRole] = useState('Analyst'); // Analyst or Manager

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>HackHyd Cyber Threat Intelligence</h1>
          <div className="role-selector">
            <label htmlFor="role">Select Role: </label>
            <select id="role" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
              <option value="Analyst">Analyst</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </header>
        <Navigation />
        <main>
          {userRole === 'Manager' ? (
            <Dashboard />
          ) : (
            <Routes>
              <Route path="/" element={<Threats />} />
              <Route path="/threat-actors" element={<ThreatActors />} />
              <Route path="/intel-feeds" element={<IntelFeeds />} />
              <Route path="/search" element={<Search />} />
              <Route path="/cve-analysis" element={<CveAnalysis />} />
              <Route path="/api-docs" element={<ApiDocs />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;