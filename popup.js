document.getElementById('reportBtn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      alert(`Reported: ${tabs[0].url}`);
      // Add Firebase integration here
    });
  });