import { getReports } from './firebase.js';

async function updateDashboard() {
  const reports = await getReports();
  
  // Update table
  const tbody = document.querySelector('#reportsTable tbody');
  tbody.innerHTML = reports.map(report => `
    <tr>
      <td>${report.url}</td>
      <td>${new Date(report.timestamp).toLocaleString()}</td>
    </tr>
  `).join('');

  // Update chart
  new Chart(document.getElementById('reportsChart'), {
    type: 'bar',
    data: {
      labels: reports.map(r => new Date(r.timestamp).toLocaleDateString()),
      datasets: [{
        label: 'Phishing Reports',
        data: reports.map(() => 1),
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      }]
    }
  });
}

// Update every 30 seconds
setInterval(updateDashboard, 30000);
updateDashboard();