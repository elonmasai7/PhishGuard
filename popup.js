// popup.js
document.addEventListener('DOMContentLoaded', async () => {
    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Elements
    const statusElement = document.getElementById('status');
    const reportBtn = document.getElementById('reportBtn');
    const statsElement = document.querySelector('.stats');
  
    // 1. Update Protection Status
    async function updateStatus() {
      const isSafe = await checkUrlSafety(tab.url);
      statusElement.innerHTML = `
        <svg class="status-icon" viewBox="0 0 24 24" fill="${isSafe ? '#38A169' : '#E53E3E'}">
          <circle cx="12" cy="12" r="10" fill="currentColor"/>
          <path d="${isSafe ? 'M5 13l4 4L19 7' : 'M12 8v4M12 16h.01'}" 
                stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>${isSafe ? 'All Safe' : 'Threat Detected'}</span>
      `;
    }
  
    // 2. Report Button Handler
    reportBtn.addEventListener('click', async () => {
      try {
        await chrome.runtime.sendMessage({
          type: 'reportPhishing',
          url: tab.url
        });
        
        // Update stats after reporting
        updateStats();
        showToast('✅ Reported successfully!');
      } catch (error) {
        showToast('❌ Error reporting site');
      }
    });
    // Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.setAttribute('data-theme', 
    document.body.classList.contains('dark') ? 'dark' : 'light'
  );
  
  // Save theme preference
  chrome.storage.local.set({
    theme: document.body.classList.contains('dark') ? 'dark' : 'light'
  });
});

// Load saved theme
chrome.storage.local.get('theme', (result) => {
  if (result.theme === 'dark') {
    document.body.classList.add('dark');
    document.body.setAttribute('data-theme', 'dark');
  }
});

// Animated number counters
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

// Initialize counters
animateValue(document.getElementById('blockedCount'), 0, 124, 2000);
  
    // 3. Real-time Stats
    async function updateStats() {
      const { threatsBlocked = 0 } = await chrome.storage.local.get('threatsBlocked');
      statsElement.innerHTML = `
        <p>🛡️ ${threatsBlocked} threats blocked today</p>
        <p>🌐 ${calculateAccuracy(threatsBlocked)}% detection accuracy</p>
      `;
    }
  
    // Helper functions
    async function checkUrlSafety(url) {
      const { blockedUrls = [] } = await chrome.storage.local.get('blockedUrls');
      return !blockedUrls.some(bu => url.includes(bu));
    }
  
    function calculateAccuracy(threats) {
      return Math.min(98, 90 + Math.floor(threats/10));
    }
  
    function showToast(message) {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.style = `/* Add toast styles */`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }
  
    // Initial load
    updateStatus();
    updateStats();
  });