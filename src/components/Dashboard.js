import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({ criticalThreats: 0, activeActors: 0, intelFeeds: 0 });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3001/api/threats').then(res => res.json()),
      fetch('http://localhost:3001/api/threat-actors').then(res => res.json()),
      fetch('http://localhost:3001/api/intel-feeds').then(res => res.json())
    ]).then(([threats, actors, feeds]) => {
      const criticalThreats = threats.filter(t => t.severity === 'critical').length;
      const activeActors = actors.filter(a => a.activity_status === 'active').length;
      const intelFeeds = feeds.length;
      setStats({ criticalThreats, activeActors, intelFeeds });

      const severityCounts = threats.reduce((acc, threat) => {
        acc[threat.severity] = (acc[threat.severity] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(severityCounts),
        datasets: [
          {
            label: 'Threats by Severity',
            data: Object.values(severityCounts),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 205, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

    }).catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h2>{stats.criticalThreats}</h2>
        <p>Critical Threats</p>
      </div>
      <div className="stat-card">
        <h2>{stats.activeActors}</h2>
        <p>Active Threat Actors</p>
      </div>
      <div className="stat-card">
        <h2>{stats.intelFeeds}</h2>
        <p>Intel Feeds</p>
      </div>
      {chartData && (
        <div className="chart-container">
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;